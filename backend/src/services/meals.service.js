import { Meal } from '../models/meal.model.js';
import { calculateMealMacros, calculateTotalMealMacros, subtractMacros } from '../helpers/meals.helper.js';

export async function getTodaysMeals(userId) {
    try {
        const date = new Date().toLocaleDateString('en-US');

        return await Meal.find({ user: userId, dateCreated: date });
    } catch (e) {
        throw new Error(e);
    }
}

export async function getAllUserMeals(userId) {
    try {
        return await Meal.find({ user: userId });
    } catch (e) {
        throw new Error(e);
    }
}

export async function getSpecificMeal(req) {
    try {
        const { _id: userId } = req.user;
        const { meal } = req.body;
        const date = new Date().toLocaleDateString('en-US');
        
        return await Meal.findOne({ user: userId, dateCreated: date, meal: meal });
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateMeal(req, mealFromDb) {
    try {
        const { _id: userId } = req.user;
        const { meal, quantity, food } = req.body;
        const { name } = food;
        const date = new Date().toLocaleDateString('en-US');
        const { protein, carbs, fats, kcal } = calculateTotalMealMacros(food, mealFromDb, quantity);
        const { protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal } = calculateMealMacros(food, quantity);
        
        return await Meal.findOneAndUpdate(
            { user: userId, dateCreated: date, meal },
            { protein, carbs, fats, kcal,
                $push: {
                    food: {
                        name, protein: calculatedProtein, carbs: calculatedCarbs,
                        fats: calculatedFats, kcal: calculatedKcal, quantity
                    }
                },
            },
            { upsert: true }
        );
    } catch (e) {
        throw new Error(e);
    }
}

export async function removeMeal(req, mealFromDb) {
    try {
        const { _id: mealId } = mealFromDb;
        const { protein: sentProtein, carbs: sentCarbs, fats: sentFats, kcal: sentKcal, name } = req.body;
        const { protein, carbs, fats, kcal } = subtractMacros(mealFromDb, req.body);
        
        return await Meal.findOneAndUpdate(
            { _id: mealId },
            {
                protein, carbs, fats, kcal,
                $pull: {
                    food: { name, protein: sentProtein, carbs: sentCarbs, fats: sentFats, kcal: sentKcal }
                }
            },
            { new: true }
    );
    } catch (e) {
        throw new Error(e);
    }
}
