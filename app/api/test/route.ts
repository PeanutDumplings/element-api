import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { success: true, message: "Test route works!" },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
