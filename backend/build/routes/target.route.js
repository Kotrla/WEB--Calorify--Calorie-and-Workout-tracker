import express from 'express';
import { requireLogin } from '../middleware/auth';
import { getTargets, getDailyValues } from '../controllers/target.controller';
const router = express.Router();
router.get('/', requireLogin, getTargets);
router.get('/daily', requireLogin, getDailyValues);
export { router as TargetRoute };
//# sourceMappingURL=target.route.js.map