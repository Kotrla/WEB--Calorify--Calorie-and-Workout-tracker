const express = require("express");
const router = express.Router();

const { requireLogin } = require("../middleware/auth");

const { Target } = require("../models/target");

router.get("/", requireLogin, async (req, res) => {
  const target = await Target.find({ user: req.user._id });
  res.send(target);
});

router.get("/daily", requireLogin, async (req, res) => {
  const date = new Date().toLocaleDateString("en-US");
  const target = await Target.find({ user: req.user._id, dateCreated: date });
  res.send(target);
});

module.exports = router;
