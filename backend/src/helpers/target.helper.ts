import { IFoodModel } from '../models/food.model';
import { ITargetModel } from '../models/target.model';
import { baseMacros, calculateMealMacros } from './meals.helper';

export function calculateTargetMacros(food: IFoodModel, target: ITargetModel | null, quantity: number) {
  const {
    protein: targetProtein, carbs: targetCarbs, fats: targetFats, kcal: targetKcal,
  } = target || baseMacros;
  const {
    protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal,
  } = calculateMealMacros(food, quantity);

  return {
    protein: targetProtein + calculatedProtein, carbs: targetCarbs + calculatedCarbs,
    fats: targetFats + calculatedFats, kcal: targetKcal + calculatedKcal
  };
}
