import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    role: { type: String, required: true }, // 'Mom', 'Dad', 'Dhivakar', etc.
    text: { type: String, required: true },
    chatId: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);