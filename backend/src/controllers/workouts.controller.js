import { addOrUpdateExercise, getUsersWorkout, removeExercise } from '../services/workouts.service.js';

export const getWorkout = async (req, res) => {
    const { _id: userId } = req.user;
    const workout = await getUsersWorkout(userId);

    res.send(workout);
};

export const addExercise = async (req, res) => {
    const workout = await addOrUpdateExercise(req);

    res.send(workout);
};

export const deleteExercise = async (req, res) => {
    const workout = await removeExercise(req);

    res.send(workout);
};