import { addFood, getFoods } from '../services/foods.service.js';

export const getAllFoods = async (req, res) => {
    try {
        const foods = await getFoods();

        res.send(foods);
    } catch (e) {
        return res.send([]);
    }
}

export const addFoodToDatabase = async (req, res) => {
    try {
        const { name, protein, carbs, fats, kcal } = req.body;
        const addedFood = await addFood({ name, protein, carbs, fats, kcal });

        res.send(addedFood);
    } catch (err) {
        if (!(err.name === 'MongoError' && err.code === 11000)) {
            return res.status(422).send(err);
        }
        
        return res.status(422).send('The food name already exists. Please choose a different name.');
    }
}