import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const Contact = mongoose.models.Contact;
    await Contact.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Contact Deleted" });
}