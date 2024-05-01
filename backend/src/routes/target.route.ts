import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { getTargets, getDailyValues } from '../controllers/target.controller.js';

const router = express.Router();

router.get('/', requireLogin, getTargets);

router.get('/daily', requireLogin, getDailyValues);

export { router as TargetRoute };
