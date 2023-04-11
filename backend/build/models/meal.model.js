import mongoose from 'mongoose';
const MealSchema = new mongoose.Schema({
    food: Array,
    user: { type: String },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    kcal: { type: Number, default: 0 },
    meal: { type: String },
    dateCreated: { type: String },
});
export const Meal = mongoose.model('Meal', MealSchema);
//# sourceMappingURL=meal.model.js.map