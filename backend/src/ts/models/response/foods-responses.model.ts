import { IFoodModel } from '../../../models/food.model.js';

export interface IAllFoodsResponse {
	foods: IFoodModel[];
}

export interface IFoodResponse extends IFoodModel {}
