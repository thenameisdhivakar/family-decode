import { NextResponse } from 'next/server';
import { connectDB } from '../../../app/lib/mongodb'
import Note from '../../../app/models/Note';

export async function GET() {
    try {
        await connectDB();
        const notes = await Note.find({}).sort({ createdAt: -1 });
        return NextResponse.json(notes);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newNote = await Note.create(body);
        return NextResponse.json(newNote, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Note.findByIdAndDelete(id);
        return NextResponse.json({ message: "Note deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}