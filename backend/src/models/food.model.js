import joi from 'joi';
import mongoose from 'mongoose';

//food class for the food database:
//users can add their own food to it, its a user generated database.
export const Food = mongoose.model(
  "Food",
  new mongoose.Schema({
    name: { type: String, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    /// when adding food to the Food database, the grams field should be 100g
    grams: { type: Number, default: 100 },
    /// when adding food as a reference, into the Meal database of the user, the grams will be manually added
    kcal: { type: Number, required: true },
  })
);

export function customFoodValidation(food) {
  const schema = joi.object({
    name: joi.string().max(20).required(),
    protein: joi.number(),
    carbs: joi.number(),
    fats: joi.number(),
    kcal: joi.number().required(),
  });

  return schema.validate(food);
}
