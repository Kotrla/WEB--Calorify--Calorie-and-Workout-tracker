import { Request } from 'express';
import { IFoodModel } from '../models/food.model';
import { IMealModel, Meal } from '../models/meal.model';
import { IMealResponse } from '../ts/models/response/meals-responses.model';
import { IDeleteMealRequest, IUpdateMealRequest } from '../ts/models/request/meals-requests.model';
import { calculateMealMacros, calculateTotalMealMacros, subtractMacros } from '../helpers/meals.helper';

export async function getTodaysMeals(userId: string) {
  try {
    const date = new Date().toLocaleDateString('en-US');

    return await Meal.find({ user: userId, dateCreated: date });
  } catch (e) {
    throw new Error('e');
  }
}

export async function getAllUserMeals(userId: string) {
  try {
    return await Meal.find({ user: userId });
  } catch (e) {
    throw new Error('e');
  }
}

export async function getSpecificMeal(req: Request<{}, IMealResponse, IUpdateMealRequest | IDeleteMealRequest>) {
  try {
    const { _id: userId } = req.user;
    const { meal } = req.body;
    const date = new Date().toLocaleDateString('en-US');

    return await Meal.findOne({ user: userId, dateCreated: date, meal });
  } catch (e) {
    throw new Error('e');
  }
}

export async function updateMeal(req: Request<{}, IMealResponse, IUpdateMealRequest>, mealFromDb: IMealModel | null) {
  try {
    const { _id: userId } = req.user;
    const { meal, quantity, food } = req.body;
    const { name } = food;
    const date = new Date().toLocaleDateString('en-US');
    const { protein, carbs, fats, kcal } = calculateTotalMealMacros(food, mealFromDb, quantity);
    const {
      protein: calculatedProtein, carbs: calculatedCarbs, fats: calculatedFats, kcal: calculatedKcal,
    } = calculateMealMacros(food, quantity);

    return await Meal.findOneAndUpdate(
      { user: userId, dateCreated: date, meal },
      {
        protein,
        carbs,
        fats,
        kcal,
        $push: {
          food: {
            name,
            protein: calculatedProtein,
            carbs: calculatedCarbs,
            fats: calculatedFats,
            kcal: calculatedKcal,
            quantity,
          },
        },
      },
      { upsert: true },
    );
  } catch (e) {
    throw new Error('e');
  }
}

export async function removeMeal(req: Request<{}, IMealResponse, IFoodModel>, mealFromDb: IMealModel) {
  try {
    const { _id: mealId } = mealFromDb;
    const { protein: sentProtein, carbs: sentCarbs, fats: sentFats, kcal: sentKcal, name } = req.body;
    const { protein, carbs, fats, kcal } = subtractMacros(mealFromDb, req.body);

    return await Meal.findOneAndUpdate(
      { _id: mealId },
      {
        protein,
        carbs,
        fats,
        kcal,
        $pull: {
          food: {
            name, protein: sentProtein, carbs: sentCarbs, fats: sentFats, kcal: sentKcal,
          },
        },
      },
      { new: true },
    );
  } catch (e) {
    throw new Error('e');
  }
}
