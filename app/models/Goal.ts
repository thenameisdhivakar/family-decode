import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    color: { type: String, default: 'bg-blue-600' },
    createdBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);