import { calculateFoodMacros } from '../utils/macroFunctions.js';

export const baseMacros = { protein: 0, carbs: 0, fats: 0, kcal: 0 };

export function calculateTotalMealMacros(food, meal, quantity) {
    const { protein: mealProtein, carbs: mealCarbs, fats: mealFats, kcal: mealKcal } = meal || baseMacros;
    const { protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal } = calculateMealMacros(food, quantity);

    return {
        protein: Number(mealProtein) + Number(calculatedProtein),
        carbs: Number(mealCarbs) + Number(calculatedCarbs),
        fats: Number(mealFats) + Number(calculatedFats),
        kcal: Number(mealKcal) + Number(calculatedKcal)
    };
}

export function calculateMealMacros(food, quantity) {
    const { protein, carbs, fats, kcal } = food;
    
    return calculateFoodMacros(+protein, +carbs, +fats, +kcal, +quantity);
}

export function subtractMacros(meal, food) {
    const { protein: mealProtein, carbs: mealCarbs, fats: mealFats, kcal: mealKcal } = meal;
    const { protein, carbs, fats, kcal } = food;

    return {
        protein: mealProtein - protein, carbs: mealCarbs - carbs,
        fats: mealFats - fats, kcal: mealKcal - kcal
    };
}