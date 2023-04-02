import joi from 'joi';
import mongoose from 'mongoose';

export const User = mongoose.model(
  'User',
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

export function validateUser(user) {
  const schema = joi.object({
    personal: {
      firstName: joi.string().min(4).max(20),
      lastName: joi.string().min(4).max(20),
      gender: joi.string().min(2).max(20),
      goal: joi.string().min(2).max(20),
      date: joi.string(),
    },
    credentials: {
      email: joi.string().email().required(),
      password: joi.string().min(4).max(255).required(),
    },
    stats: { weight: joi.string(), height: joi.string() },
  });
  return schema.validate(user);
}

export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
