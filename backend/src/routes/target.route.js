import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { getTargetValues, getDailyValues } from '../controllers/target.controller.js';

const router = express.Router();

router.get("/", requireLogin, getTargetValues);

router.get("/daily", requireLogin, getDailyValues);

export { router as TargetRoute };
