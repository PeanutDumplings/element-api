import validateFetch from "@/lib/validateFetch";
import { getXataClient } from "@/lib/xata";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { state: string } }) {
    try {
        const state = params.state.toLowerCase();
        const limit = request.nextUrl.searchParams.get("limit");
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

        let query: any;
        if (!limit) {
            query = await getXataClient()
                .db.elements.select(fetch)
                .filter({
                    standardState: state,
                })
                .getAll();

            if (!query.length) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `No elements with state '${state}' found`,
                        state,
                        validStates: ["solid", "liquid", "gas"],
                    },
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }

            const records: any[] = [];

            query.forEach((element: any) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { xata, id, ...data } = element;
                const pairs = Object.entries(data);
                pairs.sort((a, b) => a[0].localeCompare(b[0]));
                const sortedData = Object.fromEntries(pairs);
                records.push(sortedData);
            });

            query = records;
        } else {
            query = await getXataClient()
                .db.elements.select(fetch)
                .filter({
                    standardState: state,
                })
                .getPaginated({ pagination: { size: parseInt(limit) } });

            if (!query.records.length) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `No elements with state '${state}' found`,
                        state,
                        validStates: ["solid", "liquid", "gas"],
                    },
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }

            const records: any[] = [];

            query.records.forEach((element: any) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { xata, id, ...data } = element;
                const pairs = Object.entries(data);
                pairs.sort((a, b) => a[0].localeCompare(b[0]));
                const sortedData = Object.fromEntries(pairs);
                records.push(sortedData);
            });

            query = records;
        }

        return NextResponse.json(
            { success: true, message: `Successfully fetched ${query.length > 1 ? "elements" : "element"}`, data: query },
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
