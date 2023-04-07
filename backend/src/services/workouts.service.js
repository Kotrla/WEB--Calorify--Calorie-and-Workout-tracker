import { Workout } from '../models/workout.model.js';

export async function getUsersWorkout(userId) {
    try {
        return await Workout.find({ user: userId });
    } catch (e) {
        throw new Error(e);
    }
}

export async function addOrUpdateExercise(req) {
    try {
        const { name, reps } = req.body;
        const { _id: userId } = req.user;
        const date = new Date().toLocaleDateString('en-US');
        
        return await Workout.findOneAndUpdate(
            { user: userId, dateCreated: date }, { $push: { exercises: { name, reps } } },
            { upsert: true }
        );
    } catch (e) {
        throw new Error(e);
    }
}

export async function removeExercise(req) {
    try {
        const { name, reps } = req.body;
        const { _id: userId } = req.user;
        const date = new Date().toLocaleDateString('en-US');
        
        return await Workout.findOneAndUpdate(
            { user: userId, dateCreated: date }, { $pull: { exercises: { name, reps } } },
            { new: true }
        );
    } catch (e) {
        throw new Error(e);
    }
}