import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Schema
const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        relation: String,
    },
    { timestamps: true }
);

// Prevent overwrite error
const Contact =
    mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

// ✅ GET
export async function GET() {
    try {
        await connectDB();

        const contacts = await Contact.find();

        return NextResponse.json({ contacts });

    } catch (err: any) {
        console.error("🔥 FULL ERROR:", err); // 👈 VERY IMPORTANT

        return NextResponse.json(
            { error: err.message || "Unknown error" },
            { status: 500 }
        );
    }
}

// ✅ POST
export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();

        const newContact = await Contact.create(body);

        return NextResponse.json(newContact);
    } catch (err) {
        console.error("POST ERROR:", err);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}