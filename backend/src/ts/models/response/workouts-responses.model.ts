import { IWorkoutModel } from '../../../models/workout.model';

export interface IWorkoutResponse extends IWorkoutModel { }

export interface IAllWorkoutsResponse {
  workouts: IWorkoutResponse[];
}
