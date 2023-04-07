import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import { getUser, registerUser, loginUser, updateMacros, updateUser } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/login', loginUser);

router.get('/', requireLogin, getUser);

router.post('/register', registerUser);

router.put('/update', requireLogin, updateUser);

router.put('/updateMacros', requireLogin, updateMacros);

export { router as UsersRoute };