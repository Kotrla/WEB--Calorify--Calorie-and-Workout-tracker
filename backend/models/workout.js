const mongoose = require("mongoose");

const Workout = mongoose.model(
  "Workout",
  new mongoose.Schema({
    exercises: [],
    user: { type: String },
    dateCreated: { type: String },
  })
);
module.exports.Workout = Workout;
