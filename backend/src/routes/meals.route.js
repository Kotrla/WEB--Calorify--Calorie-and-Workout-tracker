import express from 'express';
import { Meal } from '../models/meal.model.js';
import { Target } from '../models/target.model.js';
import { requireLogin } from '../middleware/auth.js';
import { calculateFoodMacros } from '../utils/macroFunctions.js';

const router = express.Router();

router.get('/', requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString('en-US');
  const meals = await Meal.find({ user: req.user._id, dateCreated: date });

  res.send(meals);
});

router.get('/userMeals', requireLogin, async (req, res) => {
  const meals = await Meal.find({ user: req.user._id });
  
  res.send(meals);
});

router.post('/add', requireLogin, async (req, res) => {
  if (!req.body.meal) return res.status(420).send('Please specify the meal!');

  if (!req.body.food) return res.status(420).send('Please specify the food!');

  const date = new Date().toLocaleDateString('en-US');
  const { meal, quantity } = req.body;
  const { protein, carbs, fats, kcal, name } = req.body.food;
  const calculatedFoodProperties = calculateFoodMacros(+protein, +carbs, +fats, +kcal, +quantity);

  let target = await Target.findOne({ user: req.user._id, dateCreated: date });
  let meals = await Meal.findOne({ user: req.user._id, dateCreated: date, meal: meal });
  
  if (meals) {
    const carbs = Number(meals.carbs) + Number(calculatedFoodProperties.carbs);
    const protein = Number(meals.protein) + Number(calculatedFoodProperties.protein);
    const fats = Number(meals.fats) + Number(calculatedFoodProperties.fats);
    const kcal = Number(meals.kcal) + Number(calculatedFoodProperties.kcal);

    await Meal.findOneAndUpdate(
      {
        user: req.user._id,
        dateCreated: date,
        meal: meal,
      },
      {
        protein: protein,
        carbs: carbs,
        fats: fats,
        kcal: kcal,
        $push: {
          food: {
            name,
            protein: calculatedFoodProperties.protein,
            carbs: calculatedFoodProperties.carbs,
            fats: calculatedFoodProperties.fats,
            kcal: calculatedFoodProperties.kcal,
            quantity: quantity,
          },
        },
      }
    );

    if (target) {
      await Target.findOneAndUpdate(
        { user: req.user._id, dateCreated: date },
        {
          protein: Number(target.protein) + Number(calculatedFoodProperties.protein),
          carbs: Number(target.carbs) + Number(calculatedFoodProperties.carbs),
          fats: Number(target.fats) + Number(calculatedFoodProperties.fats),
          kcal: Number(target.kcal) + Number(calculatedFoodProperties.kcal),
        }
      );
    } else {
      target = new Target({
        user: req.user._id,
        dateCreated: date,
        protein: calculatedFoodProperties.protein,
        carbs: calculatedFoodProperties.carbs,
        fats: calculatedFoodProperties.fats,
        kcal: calculatedFoodProperties.kcal,
      });
    }
    target = await target.save();
  } else {
    meals = new Meal({
      user: req.user._id,
      meal: req.body.meal,
      dateCreated: date,
      protein: calculatedFoodProperties.protein,
      carbs: calculatedFoodProperties.carbs,
      fats: calculatedFoodProperties.fats,
      kcal: calculatedFoodProperties.kcal,
      food: {
        name,
        protein: calculatedFoodProperties.protein,
        carbs: calculatedFoodProperties.carbs,
        fats: calculatedFoodProperties.fats,
        kcal: calculatedFoodProperties.kcal,
        quantity: quantity,
      },
    });
    meals = await meals.save();

    if (target) {
      await Target.findOneAndUpdate(
        { user: req.user._id, dateCreated: date },
        {
          protein: Number(target.protein) + Number(calculatedFoodProperties.protein),
          carbs: Number(target.carbs) + Number(calculatedFoodProperties.carbs),
          fats: Number(target.fats) + Number(calculatedFoodProperties.fats),
          kcal: Number(target.kcal) + Number(calculatedFoodProperties.kcal),
        }
      );
    } else {
      target = await new Target({
        user: req.user._id, //the id of the user

        kcal: calculatedFoodProperties.kcal,
        protein: calculatedFoodProperties.protein,
        carbs: calculatedFoodProperties.carbs,
        fats: calculatedFoodProperties.fats,

        dateCreated: date,
      });
    }

    target = await target.save();
  }
  res.send(meals);
});

router.delete('/', requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString('en-US');
  let meals = await Meal.findOne({ user: req.user._id, _id: req.body.id, meal: req.body.meal });

  const kcal = Number(meals.kcal) - Number(req.body.kcal);
  const protein = Number(meals.protein) - Number(req.body.protein);
  const carbs = Number(meals.carbs) - Number(req.body.carbs);
  const fats = Number(meals.fats) - Number(req.body.fats);

  meals = await Meal.findOneAndUpdate(
    {
      _id: req.body.id,
      user: req.user._id,
      dateCreated: date,
      meal: req.body.meal,
    },
    { protein, carbs, fats, kcal,
      $pull: {
        food: {
          name: req.body.name,
          kcal: req.body.kcal,
          protein: req.body.protein,
          carbs: req.body.carbs,
          fats: req.body.fats,
        },
      },
    }
  );
  const t = await Target.findOne({ user: req.user._id, dateCreated: date });

  const target = await Target.findOneAndUpdate(
    {
      user: req.user._id,
      dateCreated: date,
    },
    {
      protein: Number(t.protein) - Number(req.body.protein),
      carbs: Number(t.carbs) - Number(req.body.carbs),
      fats: Number(t.fats) - Number(req.body.fats),
      kcal: Number(t.kcal) - Number(req.body.kcal),
    }
  );
  res.send(meals);
});

export { router as MealsRoute };
