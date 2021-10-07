import { React, useState, useEffect } from "react";
import axios from "axios";

import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles.js";

import CloseIcon from "@material-ui/icons/Close";
import FoodItem from "../foodItem/FoodItem.js";

function History(props) {
  ///fetch foods start code
  useEffect(() => {
    getEatenFoods();
  }, []);

  let eatenFoodsArray = [];

  const [eatenFoods, setEatenFoods] = useState(eatenFoodsArray);
  const getEatenFoods = async () => {
    const res = await axios
      .get("/target/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setEatenFoods(response.data);
      });
  };

  ///end fetch food  code

  //rendering function
  function render() {
    return eatenFoods.map((gottenMeal) => (
      <FoodItem
        key={gottenMeal._id}
        name={gottenMeal.dateCreated}
        protein={gottenMeal.protein}
        carbs={gottenMeal.carbs}
        fats={gottenMeal.fats}
        kcal={gottenMeal.kcal}
        id={gottenMeal._id}
        updateFunction={getEatenFoods}
        deleteButton={false}
      ></FoodItem>
    ));
  }

  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className={classes.modalHistory}>
        <CloseIcon onClick={props.closeModal} className={classes.button} />
        <Grid container direction="column">
          {render()}
        </Grid>
      </div>
    </div>
  );
}

export default History;
