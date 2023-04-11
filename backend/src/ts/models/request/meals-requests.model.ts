import { IFoodModel } from '../../../models/food.model';

export interface IUpdateMealRequest {
  quantity: number;
  food: IFoodModel;
  meal: string;
}

export interface IDeleteMealRequest extends IFoodModel {
  meal: string;
}
