"use server";

import { LoginFormData, RegisterFormData } from "./auth.schema";
import { createClient } from "@/config/db/env.server";
import { signAccessToken } from "@/app/shared/lib/jwt/sign";
import { JWT_CONFIG } from "@/app/shared/config/jwt";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type AuthErrorCode =
  | "emailTaken"
  | "invalidCredentials"
  | "sessionFailed"
  | "insertFailed"
  | "lookupFailed"
  | "unexpected";

type AuthData = {
  accessToken: string;
  user: { userId: string; email: string; username: string };
};

export type AuthResult =
  | { success: true; data: AuthData }
  | { success: false; code: AuthErrorCode };

export async function signUp(data: RegisterFormData): Promise<AuthResult> {
  try {
    const supabaseClient = await createClient();

    const { data: returnUser, error: lookupError } = await supabaseClient
      .from("users")
      .select("id")
      .eq("email", data.email);

    if (lookupError) {
      return { success: false, code: "lookupFailed" };
    }

    if (returnUser && returnUser.length > 0) {
      return { success: false, code: "emailTaken" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { data: newUser, error: insertError } = await supabaseClient
      .from("users")
      .insert({
        username: data.username,
        email: data.email,
        password_hash: hashedPassword,
      })
      .select("id, email, username")
      .single();

    if (insertError || !newUser) {
      return { success: false, code: "insertFailed" };
    }

    // Refresh token (httpOnly cookie)
    const refreshToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + JWT_CONFIG.refreshTokenExpiry);

    const { error: sessionError } = await supabaseClient
      .from("sessions")
      .insert({
        user_id: newUser.id,
        token_hash: crypto
          .createHash("sha256")
          .update(refreshToken)
          .digest("hex"),
        expires_at: expiresAt,
      });

    if (sessionError) {
      return { success: false, code: "sessionFailed" };
    }

    const cookieStore = await cookies();
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    // Access token returned to client
    const accessToken = await signAccessToken({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    return {
      success: true,
      data: {
        accessToken,
        user: {
          userId: newUser.id,
          email: newUser.email,
          username: newUser.username,
        },
      },
    };
  } catch (error) {
    console.error("[signUp]", error);
    return { success: false, code: "unexpected" };
  }
}

export async function signIn(data: LoginFormData): Promise<AuthResult> {
  try {
    const supabaseClient = await createClient();

    const { data: user, error: lookupError } = await supabaseClient
      .from("users")
      .select("id, email, username, password_hash")
      .eq("email", data.email)
      .single();

    if (lookupError || !user) {
      return { success: false, code: "invalidCredentials" };
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password_hash,
    );
    if (!passwordMatch) {
      return { success: false, code: "invalidCredentials" };
    }

    await supabaseClient.from("sessions").delete().eq("user_id", user.id);

    // Refresh token (httpOnly cookie)
    const refreshToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    const expiresAt = new Date(Date.now() + JWT_CONFIG.refreshTokenExpiry);

    const { error: sessionError } = await supabaseClient
      .from("sessions")
      .insert({
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      });

    if (sessionError) {
      return { success: false, code: "sessionFailed" };
    }

    const cookieStore = await cookies();
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    // Access token (returned to client)
    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      success: true,
      data: {
        accessToken,
        user: {
          userId: user.id,
          email: user.email,
          username: user.username,
        },
      },
    };
  } catch (error) {
    console.error("[signIn]", error);
    return { success: false, code: "unexpected" };
  }
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token")?.value;
  if (!token) return null;

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("sessions")
    .select("user_id, expires_at")
    .eq("token_hash", tokenHash)
    .single();

  if (!session || new Date(session.expires_at) < new Date()) return null;

  return session.user_id;
}

export async function signOut() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refresh_token")?.value;

  if (token) {
    const supabaseClient = await createClient();
    await supabaseClient
      .from("sessions")
      .delete()
      .eq(
        "token_hash",
        crypto.createHash("sha256").update(token).digest("hex"),
      );
  }

  cookieStore.delete("refresh_token");
  redirect("/login");
}
