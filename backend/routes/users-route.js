const express = require("express");
const router = express.Router();

const { User, validate, getAge } = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth");
const { calculateMacros } = require("../calculatingLogic/macroFunctions");

router.get("/", requireLogin, async (req, res) => {
  const users = await User.find({ _id: req.user._id });

  res.send(users);
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let users = await User.findOne({ email: req.body.credentials.email });
  if (users) {
    return res.status(455).send("Email already in use");
  }
  const hash = await bcrypt.hash(req.body.credentials.password, 10);
  const ageCalc = getAge(req.body.personal.date);
  const macros = calculateMacros(
    req.body.stats.weight,
    req.body.stats.height,
    req.body.personal.gender,
    ageCalc,
    req.body.personal.goal
  );
  users = new User({
    personal: {
      firstName: req.body.personal.firstName,
      lastName: req.body.personal.lastName,
      age: ageCalc,
      gender: req.body.personal.gender,
      goal: req.body.personal.goal,
      date: req.body.personal.date,
    },

    credentials: {
      email: req.body.credentials.email,
      password: hash,
    },

    stats: {
      weight: req.body.stats.weight,
      height: req.body.stats.height,
    },
    needs: {
      kcal: macros.kcal,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
    },
  });
  await users.save();
  res.send(users);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ "credentials.email": email });

    if (!user) {
      return res.status(400).send("Incorect credentials");
    }
    const isMatch = await bcrypt.compare(password, user.credentials.password);

    if (!isMatch) {
      return res.status(400).send("Incorect credentials");
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.send({ token });
  } catch (e) {
    return res.status(400).send("Erorr" + e);
  }
});

router.put("/update", requireLogin, async (req, res) => {
  const ageCalc = getAge(req.body.personal.date);
  const macros = calculateMacros(
    Number(req.body.stats.weight),
    Number(req.body.stats.height),
    req.body.personal.gender,
    ageCalc,
    req.body.personal.goal
  );

  let userData = {
    personal: {
      firstName: req.body.personal.firstName,
      lastName: req.body.personal.lastName,
      age: ageCalc,
      gender: req.body.personal.gender,
      goal: req.body.personal.goal,
      date: req.body.personal.date,
    },

    credentials: {
      email: req.body.credentials.email,
      password: req.body.credentials.password,
    },

    stats: {
      weight: req.body.stats.weight,
      height: req.body.stats.height,
    },
    needs: {
      kcal: macros.kcal,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
    },
  };

  let users = await User.findOneAndUpdate({ _id: req.body._id }, userData, {
    new: true,
  });

  res.send(users);
});

router.put("/updateMacros", requireLogin, async (req, res) => {
  let users = await User.findOneAndUpdate({ _id: req.user._id }, req.body);

  res.send(users);
});
module.exports = router;
