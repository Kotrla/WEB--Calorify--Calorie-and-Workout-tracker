import mongoose from 'mongoose';

const foodSchema =  new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    grams: { type: Number, default: 100 },
    kcal: { type: Number, required: true }
})

export const Food = mongoose.model("Food", foodSchema);
