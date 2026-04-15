import { createClient } from "@/config/env/env.server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return NextResponse.json(null);
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const supabase = await createClient();

  const { data: session } = await supabase
    .from("sessions")
    .select("user_id, expires_at")
    .eq("token_hash", tokenHash)
    .single();

  if (!session || new Date(session.expires_at) < new Date()) {
    return NextResponse.json(null);
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, email, username")
    .eq("id", session.user_id)
    .single();

  return NextResponse.json(user ?? null);
}
