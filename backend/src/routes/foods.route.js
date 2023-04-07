import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { getAllFoods, addFoodToDatabase } from '../controllers/foods.controller.js';

const router = express.Router();

router.get('/', requireLogin, getAllFoods);

router.post('/', requireLogin, addFoodToDatabase);

export { router as FoodsRoute };
