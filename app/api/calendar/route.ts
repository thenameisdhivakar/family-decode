import { NextResponse, NextRequest } from "next/server";

import { connectDB } from "../../lib/mongodb";
import Event from "../../models/Calendar";

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({
            createdAt: -1,
        });

        return NextResponse.json(events, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed to fetch events",
            },
            {
                status: 500,
            }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const newEvent = await Event.create(body);

        return NextResponse.json(newEvent, {
            status: 201,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Failed to create event",
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}