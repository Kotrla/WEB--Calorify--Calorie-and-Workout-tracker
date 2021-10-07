const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middleware/auth");

const { Food } = require("../models/food");
const { Meal } = require("../models/meal");
const { Target } = require("../models/target");

const { calculateFoodMacros } = require("../calculatingLogic/macroFunctions");

router.get("/", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");
  const meals = await Meal.find({ user: req.user._id, dateCreated: date });
  res.send(meals);
});

router.get("/userMeals", requireLogin, async (req, res) => {
  const meals = await Meal.find({ user: req.user._id });
  res.send(meals);
});

router.post("/add", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");

  if (!req.body.meal) return res.status(420).send("Please specify the meal!");
  if (!req.body.food) return res.status(420).send("Please specify the food!");
  const gottenFood = req.body.food;
  const quantity = req.body.quantity;
  const meal = req.body.meal;
  const calcFood = calculateFoodMacros(
    Number(gottenFood.protein),
    Number(gottenFood.carbs),
    Number(gottenFood.fats),
    Number(gottenFood.kcal),
    Number(quantity)
  );

  let meals = await Meal.findOne({
    user: req.user._id,
    dateCreated: date,
    meal: meal,
  });

  let target = await Target.findOne({ user: req.user._id, dateCreated: date });

  if (meals) {
    let c = Number(meals.carbs) + Number(calcFood.carbs);
    let p = Number(meals.protein) + Number(calcFood.protein);
    let f = Number(meals.fats) + Number(calcFood.fats);
    let k = Number(meals.kcal) + Number(calcFood.kcal);

    await Meal.findOneAndUpdate(
      {
        user: req.user._id,
        dateCreated: date,
        meal: meal,
      },
      {
        protein: p,
        carbs: c,
        fats: f,
        kcal: k,
        $push: {
          food: {
            name: gottenFood.name,
            protein: calcFood.protein,
            carbs: calcFood.carbs,
            fats: calcFood.fats,
            kcal: calcFood.kcal,
            quantity: quantity,
          },
        },
      }
    );

    if (target) {
      await Target.findOneAndUpdate(
        { user: req.user._id, dateCreated: date },
        {
          protein: Number(target.protein) + Number(calcFood.protein),
          carbs: Number(target.carbs) + Number(calcFood.carbs),
          fats: Number(target.fats) + Number(calcFood.fats),
          kcal: Number(target.kcal) + Number(calcFood.kcal),
        }
      );
    } else {
      target = new Target({
        user: req.user._id,
        dateCreated: date,
        protein: calcFood.protein,
        carbs: calcFood.carbs,
        fats: calcFood.fats,
        kcal: calcFood.kcal,
      });
    }
    target = await target.save();
  } else {
    meals = new Meal({
      user: req.user._id,
      meal: req.body.meal,
      dateCreated: date,
      protein: calcFood.protein,
      carbs: calcFood.carbs,
      fats: calcFood.fats,
      kcal: calcFood.kcal,
      food: {
        name: gottenFood.name,
        protein: calcFood.protein,
        carbs: calcFood.carbs,
        fats: calcFood.fats,
        kcal: calcFood.kcal,
        quantity: quantity,
      },
    });
    meals = await meals.save();

    if (target) {
      await Target.findOneAndUpdate(
        { user: req.user._id, dateCreated: date },
        {
          protein: Number(target.protein) + Number(calcFood.protein),
          carbs: Number(target.carbs) + Number(calcFood.carbs),
          fats: Number(target.fats) + Number(calcFood.fats),
          kcal: Number(target.kcal) + Number(calcFood.kcal),
        }
      );
    } else {
      target = await new Target({
        user: req.user._id, //the id of the user

        kcal: calcFood.kcal,
        protein: calcFood.protein,
        carbs: calcFood.carbs,
        fats: calcFood.fats,

        dateCreated: date,
      });
    }

    target = await target.save();
  }
  res.send(meals);
});

router.delete("/", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");
  let meals = await Meal.findOne({
    user: req.user._id,
    _id: req.body.id,
    meal: req.body.meal,
  });

  let k = Number(meals.kcal) - Number(req.body.kcal);
  let p = Number(meals.protein) - Number(req.body.protein);
  let c = Number(meals.carbs) - Number(req.body.carbs);
  let f = Number(meals.fats) - Number(req.body.fats);

  meals = await Meal.findOneAndUpdate(
    {
      _id: req.body.id,
      user: req.user._id,
      dateCreated: date,
      meal: req.body.meal,
    },
    {
      protein: p,
      carbs: c,
      fats: f,
      kcal: k,
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
  t = await Target.findOne({ user: req.user._id, dateCreated: date });

  target = await Target.findOneAndUpdate(
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
module.exports = router;
