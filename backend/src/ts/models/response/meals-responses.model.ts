import { IMealModel } from '../../../models/meal.model.js';

export interface IMealsResponse {
	meals: IMealModel[];
}

export interface IMealResponse extends IMealModel {}
