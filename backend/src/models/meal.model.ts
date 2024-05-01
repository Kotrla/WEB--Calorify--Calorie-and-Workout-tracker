import { IFood } from './food.model.js';
import mongoose, { Document } from 'mongoose';

export interface IMeal {
	food: IFood[];
	user: string;
	protein: number;
	carbs: number;
	fats: number;
	kcal: number;
	meal: string;
	dateCreated: string;
}

export interface IMealModel extends IMeal, Document {}

const MealSchema = new mongoose.Schema({
	food: Array,
	user: { type: String },
	protein: { type: Number, default: 0 },
	carbs: { type: Number, default: 0 },
	fats: { type: Number, default: 0 },
	kcal: { type: Number, default: 0 },
	meal: { type: String },
	dateCreated: { type: String }
});

export const Meal = mongoose.model<IMealModel>('Meal', MealSchema);
