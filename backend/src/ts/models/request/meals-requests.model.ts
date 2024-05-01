import { IFoodModel } from '../../../models/food.model.js';

export interface IUpdateMealRequest {
	quantity: number;
	food: IFoodModel;
	meal: string;
}

export interface IDeleteMealRequest extends IFoodModel {
	meal: string;
}
