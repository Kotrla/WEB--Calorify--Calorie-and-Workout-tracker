import { IFoodModel } from '../../../models/food.model';

export interface IAllFoodsResponse {
  foods: IFoodModel[];
}

export interface IFoodResponse extends IFoodModel { }
