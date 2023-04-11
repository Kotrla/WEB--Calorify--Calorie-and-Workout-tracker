import { Request, Response } from 'express';
import { IWorkoutRequest } from '../ts/models/request/workouts-requests.model';
import { IAllWorkoutsResponse, IWorkoutResponse } from '../ts/models/response/workouts-responses.model';
import { addOrUpdateExercise, getUserWorkouts, getUserCurrentWorkout, removeExercise } from '../services/workouts.service';

export const getAllUserWorkouts = async (req: Request<{}, IAllWorkoutsResponse, {}>, res: Response) => {
  const { _id: userId } = req.user;
  const workouts = await getUserWorkouts(userId);

  res.send({ workouts });
};

export const getWorkout = async (req: Request<{}, IWorkoutResponse | null, {}>, res: Response) => {
  const { _id: userId } = req.user;
  const workout = await getUserCurrentWorkout(userId);

  res.send(workout);
};

export const addExercise = async (req: Request<{}, IWorkoutResponse | null, IWorkoutRequest>, res: Response) => {
  const workout = await addOrUpdateExercise(req);

  res.send(workout);
};

export const deleteExercise = async (req: Request<{}, IWorkoutResponse | null, IWorkoutRequest>, res: Response) => {
  const workout = await removeExercise(req);

  res.send(workout);
};
