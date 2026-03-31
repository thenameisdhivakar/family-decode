

import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';


import mongoose from 'mongoose';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Awaitable params for Next.js 15+
) {
    try {
        await connectDB();

        // 1. Resolve the dynamic ID from the URL
        const resolvedParams = await params;
        const id = resolvedParams.id;

        // 2. Security Check: Is this a valid MongoDB ID?
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }

        // 3. Execute the deletion
        const deletedDoc = await Transaction.findByIdAndDelete(id);

        if (!deletedDoc) {
            return NextResponse.json({ error: "Record already deleted or not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Successfully removed" });
    } catch (error: any) {
        console.error("Delete Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}