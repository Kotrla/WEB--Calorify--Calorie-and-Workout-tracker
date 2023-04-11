import { Request, Response } from 'express';
import { IFood } from '../models/food.model';
import { addFood, getFoods } from '../services/foods.service';
import { IAllFoodsResponse, IFoodResponse } from '../ts/models/response/foods-responses.model';

export const getAllFoods = async (req: Request<{}, IAllFoodsResponse, {}>, res: Response) => {
  try {
    const foods = await getFoods();

    return res.send({ foods });
  } catch (e) {
    return res.send([]);
  }
};

export const addFoodToDatabase = async (req: Request<{}, IFoodResponse, IFood>, res: Response) => {
  try {
    const {
      name, protein, carbs, fats, kcal,
    } = req.body;
    const addedFood = await addFood({
      name, protein, carbs, fats, kcal,
    });

    return res.send(addedFood);
  } catch (e: any) {
    if (!(e.name === 'MongoError' && e.code === 11000)) {
      return res.status(422).send(e);
    }

    return res.status(422).send('The food name already exists. Please choose a different name.');
  }
};
