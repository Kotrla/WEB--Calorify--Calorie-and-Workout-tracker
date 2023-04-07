import { Food } from '../models/food.model.js'

export async function getFoods() {
    try {
        return await Food.find().sort('name')
    } catch (e) {
        throw new Error(e);
    }
}

export async function addFood(food) {
    try {
        const foods = new Food({ food });

        await foods.save();
        return (foods);
    } catch (e) {
        throw new Error(e);
    }
}