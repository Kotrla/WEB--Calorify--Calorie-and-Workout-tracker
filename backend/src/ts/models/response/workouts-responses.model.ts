import { IWorkout } from '../../../models/workout.model.js';

export interface IWorkoutResponse {
	workout: IWorkout;
}

export interface IAllWorkoutsResponse {
	workouts: IWorkout[];
}
