// import { NextResponse } from 'next/server';
// import { connectDB } from '../../../app/lib/mongodb'
// import Transaction from '../../../app/models/Transaction';

// export async function GET() {
//     try {
//         await connectDB();
//         const data = await Transaction.find().sort({ createdAt: -1 });
//         return NextResponse.json(data);
//     } catch (error) {
//         return NextResponse.json({ error: "DB Connection Failed" }, { status: 500 });
//     }
// }

// export async function POST(req: Request) {
//     try {
//         await connectDB();
//         const body = await req.json();
//         const newTx = await Transaction.create(body);
//         return NextResponse.json(newTx);
//     } catch (error) {
//         return NextResponse.json({ error: "Write Failed" }, { status: 500 });
//     }
// }