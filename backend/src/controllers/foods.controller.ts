import { IFood } from '../models/food.model';
import { Request, Response, NextFunction } from 'express';
import { addFood, getFoods } from '../services/foods.service';
import { IAllFoodsResponse, IFoodResponse } from '../ts/models/response/foods-responses.model';

export const getAllFoods = async (req: Request<{}, IAllFoodsResponse, {}>, res: Response, next: NextFunction) => {
  try {
    const foods = await getFoods();

    res.send({ foods });
  } catch (e) {
    next(e);
  }
};

export const addFoodToDatabase = async (req: Request<{}, IFoodResponse, IFood>, res: Response, next: NextFunction) => {
  try {
    const { name, protein, carbs, fats, kcal } = req.body;
    const addedFood = await addFood({ name, protein, carbs, fats, kcal });

    res.send({ addedFood });
  } catch (e) {
    next(e);
  }
};
