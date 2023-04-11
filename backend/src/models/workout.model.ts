import mongoose, { Document } from 'mongoose';

export interface IExercise {
  name: string;
  reps: string;
}

export interface IWorkout {
  exercises: IExercise[];
  user: string;
  dateCreated: string;
}

export interface IWorkoutModel extends IWorkout, Document {}

const workoutSchema = new mongoose.Schema({
  exercises: [{
    name: { type: String },
    reps: { type: String },
  }],
  user: { type: String },
  dateCreated: { type: String },
});

export const Workout = mongoose.model<IWorkoutModel>('Workout', workoutSchema);
