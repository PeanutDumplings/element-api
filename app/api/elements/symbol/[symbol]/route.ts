import capitalizeFirstLetter from "@/lib/capitaliseFirstLetter";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { symbol: string } }) {
    try {
        const symbol = capitalizeFirstLetter(params.symbol);
        const query = await getXataClient()
            .db.elements.filter({
                symbol,
            })
            .getFirst();

        if (!query) {
            return NextResponse.json(
                { success: false, message: `No element with symbol '${symbol}' found`, symbol },
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { xata, id, ...data } = query;
        const pairs = Object.entries(data);
        pairs.sort((a, b) => a[0].localeCompare(b[0]));
        const sortedData = Object.fromEntries(pairs);

        return NextResponse.json(
            { success: true, message: "Successfully fetched element", data: sortedData },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
