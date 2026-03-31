import { NextResponse } from 'next/server';
import { connectDB } from '../../../app/lib/mongodb'
import Message from '../../../app/models/Message';

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const chatId = searchParams.get('chatId');

        const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
        return NextResponse.json(messages);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newMessage = await Message.create(body);
        return NextResponse.json(newMessage);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}