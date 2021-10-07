const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middleware/auth");
const { Workout } = require("../models/workout");
const mongoose = require("mongoose");

router.get("/", requireLogin, async (req, res) => {
  const workout = await Workout.find({ user: req.user._id });

  res.send(workout);
});

router.post("/", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");
  let workout = await Workout.findOne({
    user: req.user._id,
    dateCreated: date,
  });
  if (!req.body.name) return res.status(420).send("Enter a name please.");
  if (!req.body.reps) return res.status(420).send("Enter reps please.");
  if (workout) {
    await Workout.findOneAndUpdate(
      {
        user: req.user._id,
        dateCreated: date,
      },
      {
        $push: {
          exercises: {
            name: req.body.name,
            reps: req.body.reps,
          },
        },
      }
    );
  } else {
    workout = new Workout({
      user: req.user._id,
      dateCreated: date,

      exercises: {
        name: req.body.name,
        reps: req.body.reps,
      },
    });
    workout = await workout.save();
  }

  res.send(workout);
});

router.delete("/", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");

  let workout = await Workout.findOneAndUpdate(
    {
      user: req.user._id,
      dateCreated: date,
    },
    {
      $pull: {
        exercises: {
          name: req.body.name,
          reps: req.body.reps,
        },
      },
    },
    { new: true }
  );

  res.send(workout);
});

module.exports = router;
