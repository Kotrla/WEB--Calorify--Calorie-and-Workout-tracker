import { React, useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles.js";
function AddFoodModal(props) {
  //fetching food list

  let foods = [];
  useEffect(() => {
    getFoodList();
  }, []);
  const [foodList, setFoodlist] = useState(foods);

  const getFoodList = async () => {
    const res = await axios
      .get("/foods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFoodlist(response.data);
      });
  };
  //end of fetching food list

  //begin of addding food
  async function addFood() {
    var selectedFood = foodList.find((x) => x.name === food);

    const res = await axios
      .post(
        "/meals/add",
        {
          food: selectedFood,
          quantity: grams,
          meal: meal,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(props.updateList)
      .then(props.modalFunction)
      .catch((err) => alert(err.response.data.toString()));
  }
  //end of adding food
  ///ui functions
  const meals = [
    {
      value: "Breakfast",
    },
    {
      value: "Lunch",
    },
    {
      value: "Dinner",
    },
  ];

  const [food, setFood] = useState("");
  const handleChangeFood = (event) => {
    setFood(event.target.value);
  };

  const [meal, setMeal] = useState("");
  const handleChangeMeal = (event) => {
    setMeal(event.target.value);
  };

  const [grams, setGrams] = useState(100);
  const handleChangeGrams = (event) => {
    setGrams(event.target.value);
  };
  //end of ui functions

  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={classes.modal}>
        <Grid container direction="column">
          <Typography
            className={classes.txt}
            variant="subtitle1"
            color="primary"
          >
            Add food
          </Typography>
          <TextField
            required
            className={classes.box}
            select
            label="Meal"
            value={meal}
            onChange={handleChangeMeal}
          >
            {meals.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            className={classes.box}
            select
            label="Food"
            value={food}
            onChange={handleChangeFood}
          >
            {foodList.map((option) => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={classes.box}
            type="number"
            label="Grams"
            value={grams}
            onChange={handleChangeGrams}
          />
          <Grid
            container
            direction="row"
            justify="space-around"
            className={classes.btn}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={props.modalFunction}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={addFood}>
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AddFoodModal;
