import { IFoodModel } from '../models/food.model.js';
import { ITargetModel } from '../models/target.model.js';
import { baseMacros, calculateMealMacros } from './meals.helper.js';

export function calculateTargetMacros(food: IFoodModel, target: ITargetModel | null, quantity: number) {
	const { protein: targetProtein, carbs: targetCarbs, fats: targetFats, kcal: targetKcal } = target || baseMacros;
	const {
		protein: calculatedProtein,
		carbs: calculatedCarbs,
		fats: calculatedFats,
		kcal: calculatedKcal
	} = calculateMealMacros(food, quantity);

	return {
		protein: targetProtein + calculatedProtein,
		carbs: targetCarbs + calculatedCarbs,
		fats: targetFats + calculatedFats,
		kcal: targetKcal + calculatedKcal
	};
}

export function generateBaseDaily(user: string, date: string) {
	return { user, protein: 0, carbs: 0, fats: 0, kcal: 0, date };
}
