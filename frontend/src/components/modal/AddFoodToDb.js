import { React, useState } from "react";
import axios from "axios";

import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles.js";
function AddFoodToDb(props) {
  //begin of addding food
  async function addFood() {
    const food = {
      name: name,
      protein: protein,
      carbs: carbs,
      fats: fats,
      kcal: calories,
    };

    const res = await axios
      .post("/foods/", food, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(props.modalFunction)
      .catch((err) => alert(err.response.data.toString()));
  }
  //end of adding food
  //start of ui functions

  const [name, setName] = useState();
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const [protein, setProtein] = useState();
  const handleChangeProtein = (event) => {
    setProtein(event.target.value);
  };
  const [carbs, setCarbs] = useState();
  const handleChangeCarbs = (event) => {
    setCarbs(event.target.value);
  };
  const [fats, setFats] = useState();
  const handleChangeFats = (event) => {
    setFats(event.target.value);
  };
  const [calories, setCalories] = useState();
  const handleChangeCalories = (event) => {
    setCalories(event.target.value);
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
            Add food to Database
          </Typography>
          <TextField
            required
            className={classes.box}
            label="Name"
            value={name}
            onChange={handleChangeName}
          ></TextField>
          <TextField
            required
            className={classes.box}
            type="number"
            label="Protein"
            value={protein}
            onChange={handleChangeProtein}
          />
          <TextField
            required
            className={classes.box}
            type="number"
            label="Carbs"
            value={carbs}
            onChange={handleChangeCarbs}
          />
          <TextField
            required
            className={classes.box}
            type="number"
            label="Fats"
            value={fats}
            onChange={handleChangeFats}
          />
          <TextField
            required
            className={classes.box}
            type="number"
            label="Calories per 100g"
            value={calories}
            onChange={handleChangeCalories}
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

export default AddFoodToDb;
