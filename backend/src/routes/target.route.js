import express from 'express';
import { Target } from '../models/target.model.js';
import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

router.get("/", requireLogin, async (req, res) => {
  const target = await Target.find({ user: req.user._id });

  res.send(target);
});

router.get("/daily", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");
  const target = await Target.find({ user: req.user._id, dateCreated: date });

  res.send(target);
});

export { router as TargetRoute };
