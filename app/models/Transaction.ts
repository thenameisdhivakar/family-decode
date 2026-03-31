import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true }, // Should be 'Expense', 'EMI', or 'Loans'
    date: { type: String },
}, { timestamps: true });

// This "models.Transaction || ..." line is vital for Next.js hot-reloading
export default models.Transaction || model('Transaction', TransactionSchema);