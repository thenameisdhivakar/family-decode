import { NextRequest, NextResponse } from 'next/server'; // Added NextRequest
import { connectDB } from '../../../app/lib/mongodb'
import ShoppingItem from '../../models/ShoppingItem';

export async function GET() {
    await connectDB();
    try {
        const items = await ShoppingItem.find({}).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// Added : NextRequest type here
export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const body = await req.json();
        const newItem = await ShoppingItem.create({
            ...body,
            date: new Date().toLocaleDateString('en-GB')
        });
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 400 });
    }
}

// Added : NextRequest type here
export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const { id, ...updates } = await req.json();
        const updated = await ShoppingItem.findByIdAndUpdate(id, updates, { new: true });
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

// Added : NextRequest type here
export async function DELETE(req: NextRequest) {
    await connectDB();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await ShoppingItem.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}