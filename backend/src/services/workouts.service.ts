import { Request } from 'express';
import { Workout } from '../models/workout.model';

export async function getUserWorkouts(user: string) {
  try {
    return await Workout.find({ user });
  } catch (e) {
    throw new Error('e');
  }
}

export async function getUserCurrentWorkout(user: string) {
  try {
    const date = new Date().toLocaleDateString('en-US');

    return await Workout.findOne({ user, dateCreated: date });
  } catch (e) {
    throw new Error('e');
  }
}

export async function addOrUpdateExercise(req: Request) {
  try {
    const { name, reps } = req.body;
    const { _id: userId } = req.user;
    const date = new Date().toLocaleDateString('en-US');

    return await Workout.findOneAndUpdate(
      { user: userId, dateCreated: date },
      { $push: { exercises: { name, reps } } },
      { upsert: true },
    );
  } catch (e) {
    throw new Error('e');
  }
}

export async function removeExercise(req: Request) {
  try {
    const { name, reps } = req.body;
    const { _id: userId } = req.user;
    const date = new Date().toLocaleDateString('en-US');

    return await Workout.findOneAndUpdate(
      { user: userId, dateCreated: date },
      { $pull: { exercises: { name, reps } } },
      { new: true },
    );
  } catch (e) {
    throw new Error('e');
  }
}
