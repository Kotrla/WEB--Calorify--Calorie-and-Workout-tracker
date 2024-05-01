import { Food, IFood } from '../models/food.model.js';

export async function getFoods() {
	try {
		return await Food.find().sort('name');
	} catch (e) {
		throw new Error("Couldn't find foods");
	}
}

export async function addFood(food: IFood) {
	try {
		return await Food.create(food);
	} catch (e) {
		throw new Error("Couldn't add food");
	}
}
