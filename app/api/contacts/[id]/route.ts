import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> } // Define params as a Promise
) {
    await connectDB();

    // Await the params to get the id
    const { id } = await params;

    const Contact = mongoose.models.Contact;

    try {
        await Contact.findByIdAndDelete(id);
        return NextResponse.json({ message: "Contact Deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}