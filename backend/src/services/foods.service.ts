import { Food, IFood } from '../models/food.model';

export async function getFoods() {
  try {
    return await Food.find().sort('name');
  } catch (e) {
    throw new Error('e');
  }
}

export async function addFood(food: IFood) {
  try {
    return await Food.create(food);
  } catch (e) {
    throw new Error('e');
  }
}
