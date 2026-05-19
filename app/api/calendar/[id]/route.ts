import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "../../../lib/mongodb";
import Event from "../../../models/Calendar";

// UPDATE EVENT
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const body = await req.json();

        const updatedEvent = await Event.findByIdAndUpdate(
            params.id,
            body,
            {
                new: true,
            }
        );

        return NextResponse.json(updatedEvent, {
            status: 200,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Failed to update event",
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

// DELETE EVENT
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        await Event.findByIdAndDelete(params.id);

        return NextResponse.json(
            {
                message: "Event deleted successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Failed to delete event",
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}