const mongoose = require("mongoose");
const Joi = require("joi");
//food class for the food database:
//users can add their own food to it, its a user generated database.
const Food = mongoose.model(
  "Food",
  new mongoose.Schema({
    name: { type: String, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    /// when adding food to the Food database, the grams field should be 100g
    grams: { type: Number, default: 100 },
    /// when adding food as a reference, into the Meal database of the user, the grams will be manually added
    kcal: { type: Number, required: true },
  })
);

function validateCustom(food) {
  const schema = Joi.object({
    name: Joi.string().max(20).required(),
    protein: Joi.number(),
    carbs: Joi.number(),
    fats: Joi.number(),
    kcal: Joi.number().required(),
  });

  return schema.validate(food);
}
module.exports.validate = validateCustom;
module.exports.Food = Food;
