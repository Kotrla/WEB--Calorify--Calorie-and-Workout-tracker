const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middleware/auth");
const { Food } = require("../models/food");

router.get("/", requireLogin, async (req, res) => {
  const foods = await Food.find().sort("name");
  res.send(foods);
});

router.post("/", requireLogin, async (req, res) => {
  try {
    foods = new Food({
      name: req.body.name,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fats: req.body.fats,
      kcal: req.body.kcal,
    });

    foods = await foods.save();
    res.send(foods);
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      return res
        .status(422)
        .send(
          "Opps, there already is a food with the same name, please consider picking another name!"
        );
    } else return res.status(422).send(err);
  }
});

module.exports = router;
