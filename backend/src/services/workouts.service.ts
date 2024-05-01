import { Request } from 'express';
import { Workout } from '../models/workout.model.js';

export async function getUserWorkouts(user: string) {
	try {
		return await Workout.find({ user });
	} catch (e) {
		throw new Error('Workouts not found');
	}
}

export async function getUserCurrentWorkout(user: string) {
	try {
		const date = new Date().toLocaleDateString('en-US');

		return await Workout.findOne({ user, dateCreated: date });
	} catch (e) {
		throw new Error('Workout not found');
	}
}

export async function addOrUpdateExercise(req: Request) {
	try {
		const { name, reps, load } = req.body;
		const { _id: userId } = req.user;
		const date = new Date().toLocaleDateString('en-US');

		return await Workout.findOneAndUpdate(
			{ user: userId, dateCreated: date },
			{ $push: { exercises: { name, reps, load } } },
			{ upsert: true }
		);
	} catch (e) {
		throw new Error("Couldn't add workout");
	}
}

export async function removeExercise(req: Request) {
	try {
		const { name, reps } = req.body;
		const { _id: userId } = req.user;
		const date = new Date().toLocaleDateString('en-US');

		return await Workout.findOneAndUpdate({ user: userId, dateCreated: date }, { $pull: { exercises: { name, reps } } }, { new: true });
	} catch (e) {
		throw new Error("Couldn't remove workout");
	}
}
