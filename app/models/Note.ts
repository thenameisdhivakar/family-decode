import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['Public', 'Private'], default: 'Public' },
    date: { type: String, required: true }, // Storing formatted date string
}, { timestamps: true });

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);