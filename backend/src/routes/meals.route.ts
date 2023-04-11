import express from 'express';
import { requireLogin } from '../middleware/auth';
import { getMeals, getAllMeals, addMeal, deleteMeal } from '../controllers/meals.controller';

const router = express.Router();

router.get('/', requireLogin, getMeals);

router.post('/add', requireLogin, addMeal);

router.delete('/', requireLogin, deleteMeal);

router.get('/userMeals', requireLogin, getAllMeals);

export { router as MealsRoute };
