import validateFetch from "@/lib/validateFetch";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { number: string } }) {
    try {
        const atomicNumber = parseInt(params.number);
        let fetch: any = request.nextUrl.searchParams.get("fetch");

        if (fetch) {
            fetch = fetch.split(",");
            const validFetch = validateFetch(fetch);
            if (validFetch !== true) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Invalid field '${validFetch.field}' in fetch query.`,
                        validFields: validFetch.allowedFetch,
                    },
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }
        }

        const query = await getXataClient()
            .db.elements.select(fetch)
            .filter({
                atomicNumber: atomicNumber,
            })
            .getFirst();

        if (!query) {
            return NextResponse.json(
                { success: false, message: `No element with atomic number '${atomicNumber}' found`, atomicNumber },
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
