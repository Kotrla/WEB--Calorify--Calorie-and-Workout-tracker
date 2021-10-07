const mongoose = require("mongoose");
const Joi = require("joi");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    personal: {
      firstName: {
        type: String,
        minlength: 4,
        maxlength: 20,
        sparse: true,
      },
      lastName: {
        type: String,
        minlength: 4,
        maxlength: 20,
        sparse: true,
      },
      age: { type: String },
      gender: { type: String },
      goal: { type: String },
      date: { type: String },
    },

    credentials: {
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true,
        sparse: true,
      },
      password: { type: String, required: true, minlength: 4, maxlength: 255 },
    },

    stats: {
      weight: { type: String },
      height: { type: String },
    },
    needs: {
      kcal: String,
      protein: String,
      carbs: String,
      fats: String,
    },
  })
);

function validateCustom(user) {
  const schema = Joi.object({
    personal: {
      firstName: Joi.string().min(4).max(20),
      lastName: Joi.string().min(4).max(20),
      gender: Joi.string().min(2).max(20),
      goal: Joi.string().min(2).max(20),
      date: Joi.string(),
    },
    credentials: {
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(255).required(),
    },
    stats: { weight: Joi.string(), height: Joi.string() },
  });
  return schema.validate(user);
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

module.exports.getAge = getAge;
module.exports.validate = validateCustom;
module.exports.User = User;
