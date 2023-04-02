import express from 'express';
import { Food } from '../models/food.model.js';
import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireLogin, async (_ , res) => {
  const foods = await Food.find().sort('name');

  res.send(foods);
});

router.post('/', requireLogin, async (req, res) => {
  const { name, protein, carbs, fats, kcal } = req.body;
  
  try {
    const foods = new Food({ name, protein, carbs, fats, kcal });

    foods = await foods.save();
    res.send(foods);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      return res
        .status(422)
        .send(
          'Opps, there already exists a food with the same name, please consider picking another name!'
        );
    } else return res.status(422).send(err);
  }
});

export { router as FoodsRoute };
