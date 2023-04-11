import { IMealModel } from '../../../models/meal.model';

export interface IMealsResponse {
  meals: IMealModel[];
}

export interface IMealResponse extends IMealModel { }
