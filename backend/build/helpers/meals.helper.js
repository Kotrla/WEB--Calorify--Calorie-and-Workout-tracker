import { calculateFoodMacros } from '../utils/macroFunctions';
export const baseMacros = {
    protein: 0, carbs: 0, fats: 0, kcal: 0
};
export function calculateTotalMealMacros(food, meal, quantity) {
    const { protein: mealProtein, carbs: mealCarbs, fats: mealFats, kcal: mealKcal } = meal || baseMacros;
    const { protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal } = calculateMealMacros(food, quantity);
    return {
        protein: mealProtein + calculatedProtein, carbs: mealCarbs + calculatedCarbs,
        fats: mealFats + calculatedFats, kcal: mealKcal + calculatedKcal
    };
}
export function calculateMealMacros(food, quantity) {
    const { protein, carbs, fats, kcal } = food;
    return calculateFoodMacros(protein, carbs, fats, kcal, quantity);
}
export function subtractMacros(meal, food) {
    const { protein: mealProtein, carbs: mealCarbs, fats: mealFats, kcal: mealKcal } = meal;
    const { protein, carbs, fats, kcal } = food;
    return {
        protein: mealProtein - protein, carbs: mealCarbs - carbs,
        fats: mealFats - fats, kcal: mealKcal - kcal
    };
}
//# sourceMappingURL=meals.helper.js.map