import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    docType: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String, required: true },
    fileData: { type: String, required: true }, // Storing Base64 string
    date: { type: String, required: true },
    userId: { type: String, required: true }, // To keep family docs private
}, { timestamps: true });

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);