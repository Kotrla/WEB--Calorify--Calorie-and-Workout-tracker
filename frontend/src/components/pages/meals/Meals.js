import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import FoodItem from "../../foodItem/FoodItem";
import Backdrop from "../../modal/Backdrop";

import {
  Button,
  Grid,
  Container,
  Typography,
  Accordion,
  Divider,
  Box,
} from "@material-ui/core";

import { useStyles } from "./styles.js";

import AddFoodModal from "../../modal/AddFoodModal";
import AddFoodToDb from "../../modal/AddFoodToDb";
import History from "../../modal/History";

export default function Meals() {
  //beginning user code
  const [user, setUser] = useState();

  const history = useHistory();

  const getUser = async () => {
    const res = await axios.get("/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setUser(res.data);
  };

  useEffect(() => {
    getUser();
    getEatenFoods();
  }, []);

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  //end user code
  //modal start code
  const [showModalHistory, setShowModalHistory] = useState(false);
  const openModalHistory = () => {
    setShowModalHistory((prev) => !prev);
  };

  const [showModalFood, setShowModalFood] = useState(false);
  const openModal = () => {
    setShowModalFood((prev) => !prev);
  };

  const [showModalFoodDB, setShowModalFoodDB] = useState(false);
  const openModalDB = () => {
    setShowModalFoodDB((prev) => !prev);
  };
  ///end modal code

  ///fetch foods start code
  let eatenFoodsArray = [];
  const [eatenFoods, setEatenFoods] = useState(eatenFoodsArray);

  const getEatenFoods = async () => {
    const res = await axios
      .get("/meals/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setEatenFoods(response.data);
      });
  };

  ///end fetch food  code
  function render(input) {
    return eatenFoods
      .filter((ef) => ef.meal.includes(input))
      .map((gottenMeal) =>
        gottenMeal.food.map((foodItem) => (
          <FoodItem
            key={foodItem.name}
            name={foodItem.name}
            protein={foodItem.protein}
            carbs={foodItem.carbs}
            fats={foodItem.fats}
            kcal={foodItem.kcal}
            meal={gottenMeal.meal}
            id={gottenMeal._id}
            grams={foodItem.quantity}
            updateFunction={getEatenFoods}
            deleteButton={true}
          ></FoodItem>
        ))
      );
  }
  const classes = useStyles();
  return (
    <>
      {showModalHistory && <History closeModal={openModalHistory} />}
      {showModalHistory && <Backdrop onClick={openModalHistory} />}

      {showModalFoodDB && <AddFoodToDb modalFunction={openModalDB} />}
      {showModalFoodDB && <Backdrop onClick={openModalDB} />}

      {showModalFood && (
        <AddFoodModal modalFunction={openModal} updateList={getEatenFoods} />
      )}
      {showModalFood && <Backdrop onClick={openModal} />}
      <div className={classes.container}>
        <Grid container direction="row">
          <Container>
            <Grid
              container
              justify="space-between"
              className={classes.smallContainer}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={openModalHistory}
                >
                  History
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={openModalDB}
                >
                  Add food
                </Button>
              </Grid>
              <Button variant="contained" color="primary" onClick={openModal}>
                Add
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.titleDiv}>
              <Container>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.label}>Breakfast</Typography>
                  </Grid>

                  <Grid item></Grid>
                </Grid>
              </Container>
            </Grid>
            {render("Breakfast")}

            <Grid item xs={12} className={classes.titleDiv}>
              <Container>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.label}>Lunch</Typography>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Container>
            </Grid>

            {render("Lunch")}
            <Grid item xs={12} className={classes.titleDiv}>
              <Container>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography className={classes.label}>Dinner</Typography>
                  </Grid>{" "}
                  <Grid item></Grid>
                </Grid>
              </Container>
            </Grid>
            {render("Dinner")}
            <Grid
              container
              justify="space-between"
              className={classes.smallContainer}
            ></Grid>
          </Container>
        </Grid>
      </div>
    </>
  );
}
