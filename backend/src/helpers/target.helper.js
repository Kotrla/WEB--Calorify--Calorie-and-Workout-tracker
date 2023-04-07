import { baseMacros, calculateMealMacros } from './meals.helper.js';

export function calculateTargetMacros(food, target, quantity) {
    const { protein: targetProtein, carbs: targetCarbs, fats: targetFats, kcal: targetKcal } = target || baseMacros;
    const { protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal } = calculateMealMacros(food, quantity);
    
    return {
        protein: Number(targetProtein) + Number(calculatedProtein),
        carbs: Number(targetCarbs) + Number(calculatedCarbs),
        fats: Number(targetFats) + Number(calculatedFats),
        kcal: Number(targetKcal) + Number(calculatedKcal)
    };
}