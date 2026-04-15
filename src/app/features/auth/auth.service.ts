"use server";

import { LoginFormData, RegisterFormData } from "./auth.schema";
import { createClient } from "@/config/env/env.server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(data: RegisterFormData) {
  try {
    const supabaseClient = await createClient();

    // 1. Check if user already exists
    const { data: returnUser, error: lookupError } = await supabaseClient
      .from("users")
      .select("id")
      .eq("email", data.email);

    if (lookupError) {
      return { success: false, error: "Database lookup failed", code: "UNEXPECTED" };
    }

    if (returnUser && returnUser.length > 0) {
      return { success: false, error: "Email already in use", code: "EMAIL_TAKEN" };
    }

    // 2. Hash the password and insert the new user
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const { data: newUser, error: insertError } = await supabaseClient
      .from("users")
      .insert({
        username: data.username,
        email: data.email,
        password_hash: hashedPassword,
      })
      .select("id")
      .single();

    if (insertError || !newUser) {
      return { success: false, error: "Failed to create account", code: "INSERT" };
    }

    // 3. Create a session
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const { error: sessionError } = await supabaseClient
      .from("sessions")
      .insert({
        user_id: newUser.id,
        token_hash: crypto.createHash("sha256").update(sessionToken).digest("hex"),
        expires_at: expiresAt,
      });

    if (sessionError) {
      return { success: false, error: "Session creation failed", code: "SESSION_FAILED" };
    }

    // 4. Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return { success: true, data: { userId: newUser.id } };
  } catch (error) {
    console.error("[signUp]", error);
    return { success: false, error: "Unexpected error", code: "UNEXPECTED" };
  }
}

export async function signIn(data: LoginFormData) {
  try {
    const supabaseClient = await createClient();

    // 1. Look up the user by email
    const { data: user, error: lookupError } = await supabaseClient
      .from("users")
      .select("id, email, password_hash")
      .eq("email", data.email)
      .single();

    if (lookupError || !user) {
      return { success: false, error: "Invalid email or password", code: "INVALID_CREDENTIALS" };
    }

    // 2. Compare password against stored hash
    const passwordMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password", code: "INVALID_CREDENTIALS" };
    }

    // 3. Invalidate any existing sessions
    await supabaseClient.from("sessions").delete().eq("user_id", user.id);

    // 4. Create a new session
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(sessionToken).digest("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const { error: sessionError } = await supabaseClient
      .from("sessions")
      .insert({ user_id: user.id, token_hash: tokenHash, expires_at: expiresAt });

    if (sessionError) {
      return { success: false, error: "Session creation failed", code: "SESSION_FAILED" };
    }

    // 5. Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return { success: true, data: { userId: user.id } };
  } catch (error) {
    console.error("[signIn]", error);
    return { success: false, error: "Unexpected error", code: "UNEXPECTED" };
  }
}

export async function getSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
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
  const token = cookieStore.get("session_token")?.value;

  if (token) {
    const supabaseClient = await createClient();
    await supabaseClient
      .from("sessions")
      .delete()
      .eq("token_hash", crypto.createHash("sha256").update(token).digest("hex"));
  }

  cookieStore.delete("session_token");
  redirect("/login");
}
