import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Financial', 'Life', 'Health', 'Travel'], default: 'Financial' },
    targetAmount: { type: Number, required: true, min: 0 },
    currentAmount: { type: Number, default: 0, min: 0 },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    createdBy: { type: String, required: false }
}, {
    timestamps: true
});

// FIXED MIDDLEWARE:
// Using a standard function (not arrow) to keep 'this' context.
// Mongoose 5.x+ and 6.x+ allow returning a promise or just finishing the logic.
GoalSchema.pre('save', function (next) {
    if (this.currentAmount >= this.targetAmount) {
        this.status = 'completed';
    } else {
        this.status = 'active';
    }
    // Type casting next to 'any' or 'Function' solves the TS(2349) error
    (next as any)();
});

export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);