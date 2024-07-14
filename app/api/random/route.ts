import randomEndpoint from "@/lib/randomEndpoint";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.redirect(randomEndpoint(), { status: 302 });
}
