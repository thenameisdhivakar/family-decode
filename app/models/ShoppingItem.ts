import mongoose from 'mongoose';

const ShoppingItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['shopping', 'purchased', 'hold'], default: 'shopping' },
    date: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ShoppingItem || mongoose.model('ShoppingItem', ShoppingItemSchema);