const mongoose = require("mongoose");

const Target = mongoose.model(
  "Target",
  new mongoose.Schema({
    user: { type: String },

    kcal: { type: String, default: 0 },
    protein: { type: String, default: 0 },
    carbs: { type: String, default: 0 },
    fats: { type: String, default: 0 },

    dateCreated: { type: String },
  })
);
module.exports.Target = Target;
