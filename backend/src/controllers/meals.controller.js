import { getSpecificTarget, subtractMacrosFromTarget, updateTarget } from '../services/target.service.js';
import { getAllUserMeals, getSpecificMeal, getTodaysMeals, removeMeal, updateMeal } from '../services/meals.service.js';

export const getMeals = async (req, res) => {
    const { _id: userId } = req.user;
    const meals = await getTodaysMeals(userId);

    res.send(meals);
};

export const getAllMeals = async (req, res) => {
    const { _id: userId } = req.user;
    const meals = await getAllUserMeals(userId);
  
    res.send(meals);
};

export const addMeal = async (req, res) => {
    const { meal, food } = req.body;

    if (!meal) return res.status(420).send('Please specify the meal!');

    if (!food) return res.status(420).send('Please specify the food!');

    const mealFromDatabase = await getSpecificMeal(req);
    const targetFromDatabase = await getSpecificTarget(req);

    const updatedMeals = await updateMeal(req, mealFromDatabase);
    const updatedTarget = await updateTarget(req, targetFromDatabase);
    
    res.send(updatedMeals);
};

export const deleteMeal = async (req, res) => {
    const mealFromDb = await getSpecificMeal(req);
    const removedMeal = await removeMeal(req, mealFromDb);
    
    const targetFromDb = await getSpecificTarget(req);
    const subtractedTarget = await subtractMacrosFromTarget(req, targetFromDb);
    
    res.send(removedMeal);
};