import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "../../../lib/mongodb";
import Event from "../../../models/Calendar";

export async function PUT(
    req: NextRequest,
    context: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        await connectDB();

        const { id } = await context.params;

        const body = await req.json();

        const updatedEvent =
            await Event.findByIdAndUpdate(
                id,
                body,
                {
                    new: true,
                }
            );

        return NextResponse.json(updatedEvent);
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    context: {
        params: Promise<{ id: string }>;
    }
) {
    try {
        await connectDB();

        const { id } = await context.params;

        await Event.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}