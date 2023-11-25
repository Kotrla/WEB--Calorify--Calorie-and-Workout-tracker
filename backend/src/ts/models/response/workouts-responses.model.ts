import { IWorkout } from '../../../models/workout.model';

export interface IWorkoutResponse { 
  workout: IWorkout;
}

export interface IAllWorkoutsResponse {
  workouts: IWorkout[];
}
