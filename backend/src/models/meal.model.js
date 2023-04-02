import mongoose from 'mongoose';

//Meal is the food the user has consumed
export const Meal = mongoose.model(
  "Meal",
  new mongoose.Schema({
    food: [],
    user: { type: String }, //the id of the user that added this meal
    kcal: { type: String, default: 0 },
    protein: { type: String, default: 0 },
    carbs: { type: String, default: 0 },
    fats: { type: String, default: 0 },
    meal: { type: String },
    dateCreated: { type: String },
  })
);
