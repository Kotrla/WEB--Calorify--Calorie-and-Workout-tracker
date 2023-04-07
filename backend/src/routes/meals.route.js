import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { getMeals, getAllMeals, addMeal, deleteMeal } from '../controllers/meals.controller.js';

const router = express.Router();

router.get('/', requireLogin, getMeals);

router.post('/add', requireLogin, addMeal);

router.delete('/', requireLogin, deleteMeal);

router.get('/userMeals', requireLogin, getAllMeals);

export { router as MealsRoute };
