import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { getWorkout, addExercise, deleteExercise, getAllUserWorkouts } from '../controllers/workouts.controller.js';

const router = express.Router();

router.get('/', requireLogin, getWorkout);

router.get('/all', requireLogin, getAllUserWorkouts);

router.post('/', requireLogin, addExercise);

router.delete('/', requireLogin, deleteExercise);

export { router as WorkoutsRoute };
