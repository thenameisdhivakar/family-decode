import { NextResponse } from 'next/server';
import { connectDB } from '../../../app/lib/mongodb'
import Document from '../../../app/models/Document';

export async function GET() {
    try {
        await connectDB();
        const docs = await Document.find({}).sort({ createdAt: -1 });
        return NextResponse.json(docs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Add current date formatting similar to your frontend logic
        const docData = {
            ...body,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };

        const newDoc = await Document.create(docData);
        return NextResponse.json(newDoc, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}