import { NextFunction, Request, Response } from 'express';
import { IWorkoutRequest } from '../ts/models/request/workouts-requests.model.js';
import { IAllWorkoutsResponse, IWorkoutResponse } from '../ts/models/response/workouts-responses.model.js';
import { addOrUpdateExercise, getUserWorkouts, getUserCurrentWorkout, removeExercise } from '../services/workouts.service.js';

export const getAllUserWorkouts = async (req: Request<{}, IAllWorkoutsResponse, {}>, res: Response, next: NextFunction) => {
	try {
		const { _id: userId } = req.user;
		const workouts = await getUserWorkouts(userId);

		res.send({ workouts });
	} catch (e) {
		next(e);
	}
};

export const getWorkout = async (req: Request<{}, IWorkoutResponse | null, {}>, res: Response, next: NextFunction) => {
	try {
		const { _id: userId } = req.user;
		const workout = await getUserCurrentWorkout(userId);

		res.send({ workout });
	} catch (e) {
		next({ workout: null });
	}
};

export const addExercise = async (req: Request<{}, IWorkoutResponse | null, IWorkoutRequest>, res: Response, next: NextFunction) => {
	try {
		const workout = await addOrUpdateExercise(req);

		res.send({ workout });
	} catch (e) {
		next(e);
	}
};

export const deleteExercise = async (req: Request<{}, IWorkoutResponse | null, IWorkoutRequest>, res: Response, next: NextFunction) => {
	try {
		const workout = await removeExercise(req);

		res.send({ workout });
	} catch (e) {
		next(e);
	}
};
