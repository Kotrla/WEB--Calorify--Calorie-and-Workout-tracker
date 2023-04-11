import express from 'express';
import { requireLogin } from '../middleware/auth';
import { getAllFoods, addFoodToDatabase } from '../controllers/foods.controller';

const router = express.Router();

router.get('/', requireLogin, getAllFoods);

router.post('/', requireLogin, addFoodToDatabase);

export { router as FoodsRoute };
