const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//routing
const users = require("./routes/users-route");
const foods = require("./routes/foods-route");
const meals = require("./routes/meals-route");
const workouts = require("./routes/workouts-route");
const target = require("./routes/daily-target");

app.use("/users", users);
app.use("/foods", foods);
app.use("/meals", meals);
app.use("/workout", workouts);
app.use("/target", target);

mongoose
  .connect("mongodb://localhost/calorify-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Succesfully connected to database."))
  .catch((err) => console.log("Couldnt connect to database", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT);
console.log("Listening on port 5001..");

module.exports = app;
