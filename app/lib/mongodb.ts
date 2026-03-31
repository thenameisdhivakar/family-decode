import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "";

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Stop trying after 5 seconds
        };

        console.log("🔄 Attempting to connect to MongoDB...");
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
            console.log("✅ MongoDB Connected!");
            return m;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset if it fails
        throw e;
    }
    return cached.conn;
}