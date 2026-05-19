import { NextResponse } from 'next/server';
import { connectDB } from '../../../app/lib/mongodb'
import Goal from '../../../app/models/Goal';


// GET all goals
export async function GET() {
    try {
        await connectDB();
        const goals = await Goal.find({}).sort({ createdAt: -1 });
        return NextResponse.json(goals);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST a new goal
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Ensure status is correctly set based on progress during creation
        const initialStatus = body.currentAmount >= body.targetAmount ? 'completed' : 'active';

        const newGoal = await Goal.create({
            ...body,
            status: initialStatus
        });

        return NextResponse.json(newGoal, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT to Update Amount or Toggle Status
export async function PUT(req: Request) {
    try {
        await connectDB();
        const { id, currentAmount, status, isToggle } = await req.json();

        // If it's a simple status toggle (the checkmark icon)
        if (isToggle) {
            const updatedGoal = await Goal.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            return NextResponse.json(updatedGoal);
        }

        // If it's the "Add Amount" (the trade green high icon)
        const goal = await Goal.findById(id);
        if (!goal) return NextResponse.json({ error: "Goal not found" }, { status: 404 });

        const newAmount = currentAmount;
        const newStatus = newAmount >= goal.targetAmount ? 'completed' : goal.status;

        const updatedGoal = await Goal.findByIdAndUpdate(
            id,
            { currentAmount: newAmount, status: newStatus },
            { new: true }
        );

        return NextResponse.json(updatedGoal);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE a goal
export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await Goal.findByIdAndDelete(id);
        return NextResponse.json({ message: "Goal deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}