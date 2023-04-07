import mongoose from 'mongoose';

const targetSchema = new mongoose.Schema({
    user: { type: String },
    kcal: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    dateCreated: { type: String }
});

export const Target = mongoose.model("Target", targetSchema);
