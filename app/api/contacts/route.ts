import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Define the Schema inside the route or a separate models folder
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    relation: String,
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export async function GET() {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const newContact = await Contact.create(body);
    return NextResponse.json(newContact);
}