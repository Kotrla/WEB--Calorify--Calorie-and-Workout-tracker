import mongoose, { Document } from 'mongoose';

export interface IFood {
  name: string;
  protein: number;
  carbs: number;
  fats: number;
  grams?: number;
  kcal: number;
}

export interface IFoodModel extends IFood, Document {}

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  grams: { type: Number, default: 100 },
  kcal: { type: Number, required: true },
});

export const Food = mongoose.model<IFoodModel>('Food', FoodSchema);
