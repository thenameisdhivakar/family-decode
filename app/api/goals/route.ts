import { NextResponse } from 'next/server';
import { connectDB } from '../../../app/lib/mongodb'
import Goal from '../../../app/models/Goal';

export async function GET() {
    try {
        await connectDB();
        const goals = await Goal.find({}).sort({ createdAt: -1 });
        return NextResponse.json(goals);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const newGoal = await Goal.create(body);
        return NextResponse.json(newGoal, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectDB();
        const { id, current } = await req.json();
        const updatedGoal = await Goal.findByIdAndUpdate(id, { current }, { new: true });
        return NextResponse.json(updatedGoal);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Goal.findByIdAndDelete(id);
        return NextResponse.json({ message: "Goal deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}