import { React, useState } from "react";
import axios from "axios";

import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles.js";
function AddExerciseModal(props) {
  //begin of addding exercise
  async function addFood() {
    const exercise = {
      name: name,
      reps: reps,
    };

    const res = await axios
      .post("/workout/", exercise, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(props.updateList)
      .then(props.modalFunction)
      .catch((err) => alert(err.response.data.toString()));
  }
  //end of adding exercise
  //start of ui functions

  const [name, setName] = useState();
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const [reps, setReps] = useState();
  const handleChangeReps = (event) => {
    setReps(event.target.value);
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
            Add exercise
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
            label="Reps"
            value={reps}
            onChange={handleChangeReps}
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

export default AddExerciseModal;
