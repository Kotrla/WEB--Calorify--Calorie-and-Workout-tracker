import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    food: Array,
    user: { type: String },
    kcal: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    meal: { type: String },
    dateCreated: { type: String }
});

export const Meal = mongoose.model("Meal", mealSchema);
