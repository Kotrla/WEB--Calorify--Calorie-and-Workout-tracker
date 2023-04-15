import mongoose, { Document } from 'mongoose';

export interface IExercise {
  name: string;
  reps: number;
  load: number;
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
    reps: { type: Number },
    load: { type: Number }
  }],
  user: { type: String },
  dateCreated: { type: String },
});

export const Workout = mongoose.model<IWorkoutModel>('Workout', workoutSchema);
