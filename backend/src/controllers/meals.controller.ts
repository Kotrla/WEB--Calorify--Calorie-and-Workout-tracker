import { IMealModel } from '../models/meal.model.js';
import { ITargetModel } from '../models/target.model.js';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { IMealsResponse, IMealResponse } from '../ts/models/response/meals-responses.model.js';
import { IUpdateMealRequest, IDeleteMealRequest } from '../ts/models/request/meals-requests.model.js';
import { getSpecificTarget, updateTarget, subtractMacrosFromTarget } from '../services/target.service.js';
import { getTodaysMeals, getAllUserMeals, getSpecificMeal, updateMeal, removeMeal } from '../services/meals.service.js';

export const getMeals = async (req: Request<{}, IMealsResponse, {}>, res: Response, next: NextFunction) => {
	try {
		const { _id: userId } = req.user;
		const meals = await getTodaysMeals(userId);

		res.send({ meals });
	} catch (e) {
		next(e);
	}
};

export const getAllMeals = async (req: Request<{}, IMealsResponse, {}>, res: Response, next: NextFunction) => {
	try {
		const { _id: userId } = req.user;
		const meals = await getAllUserMeals(userId);

		res.send({ meals });
	} catch (e) {
		next(e);
	}
};

export const addMeal = async (req: Request<{}, IMealResponse, IUpdateMealRequest>, res: Response, next: NextFunction) => {
	try {
		const { meal, food } = req.body;

		if (!meal) {
			res.status(420).send('Please specify the meal!');
		}

		if (!food) {
			res.status(420).send('Please specify the food!');
		}

		const mealFromDatabase = await getSpecificMeal(req);
		const targetFromDatabase = await getSpecificTarget(req);

		const updatedMeals = await updateMeal(req, mealFromDatabase);
		await updateTarget(req, targetFromDatabase);

		res.send(updatedMeals);
	} catch (e) {
		next(e);
	}
};

export const deleteMeal = async (req: Request<{}, IMealResponse, IDeleteMealRequest>, res: Response, next: NextFunction) => {
	try {
		const mealFromDb = await getSpecificMeal(req);
		const removedMeal = await removeMeal(req, mealFromDb as IMealModel);

		const targetFromDb = await getSpecificTarget(req);
		await subtractMacrosFromTarget(req, targetFromDb as ITargetModel);

		res.send(removedMeal);
	} catch (e) {
		next(e);
	}
};
