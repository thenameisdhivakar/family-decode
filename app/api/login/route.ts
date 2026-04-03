// app/api/login/route.ts
import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb'; // Your DB connection helper
// import User from '@/models/User'; // Your Mongoose User model

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // 1. Connect to MongoDB
        // await connectToDatabase();

        // 2. Find user in Database
        // const user = await User.findOne({ email });

        // 3. Logic Check (In production, use bcrypt to compare hashed passwords!)
        // if (user && user.password === password) {
        //     return NextResponse.json({ success: true, user: { email: user.email } });
        // }

        // Temporary Mock Response for testing until your DB is connected:
        if (email === "test@family.com" && password === "1234") {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}