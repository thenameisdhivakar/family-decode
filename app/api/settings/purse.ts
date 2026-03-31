import { NextResponse } from 'next/server';
import { connectDB } from '../../../app/lib/mongodb'
import Message from '../../../app/models/Message';
import Note from '../../../app/models/Note';

export async function DELETE() {
    try {
        await connectDB();
        // Clear all family data
        await Promise.all([
            Message.deleteMany({}),
            Note.deleteMany({})
        ]);
        return NextResponse.json({ message: "All application data purged successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}