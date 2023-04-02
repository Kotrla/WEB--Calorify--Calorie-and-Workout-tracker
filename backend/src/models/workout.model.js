import mongoose from 'mongoose';

export const Workout = mongoose.model(
  'Workout',
  new mongoose.Schema({
    exercises: [],
    user: { type: String },
    dateCreated: { type: String },
  })
);
