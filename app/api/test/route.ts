import { getXataClient } from "@/lib/xata";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const he = await getXataClient()
    .db.elements.filter({
      atomicNumber: 46,
    })
    .getFirst();

  if (!he) {
    return NextResponse.json(
      { success: false, message: "No data found!" },
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { xata, id, ...data } = he;

  let pairs = Object.entries(data);
  pairs.sort((a, b) => a[0].localeCompare(b[0]));
  const sortedData = Object.fromEntries(pairs);

  return NextResponse.json(
    { success: true, message: "Test route works!", data: sortedData },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
