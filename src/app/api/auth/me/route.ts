import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/app/shared/lib/jwt/verify";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  const payload = await verifyAccessToken(token);

  if (!payload) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json({
    id: payload.userId,
    email: payload.email,
    username: payload.username,
  });
}
