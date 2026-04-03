import mongoose, { Schema, model, models } from 'mongoose';

const ShoppingSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'unit' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['shopping', 'hold', 'purchased'], default: 'shopping' },
    date: { type: String }
}, { timestamps: true });

const ShoppingItem = models.ShoppingItem || model('ShoppingItem', ShoppingSchema);
export default ShoppingItem;