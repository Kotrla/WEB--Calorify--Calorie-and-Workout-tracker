import { React, useState, useEffect } from "react";
import axios from "axios";

import { Button, TextField, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles.js";
import CloseIcon from "@material-ui/icons/Close";
import ExerciseItemHistory from "../exerciseItem/ExerciseItemHistory";

function HistoryWorkout(props) {
  ///fetch foods start code
  useEffect(() => {
    getExercises();
  }, []);
  let exercisesArray = [];

  const [exercises, setExercises] = useState(exercisesArray);
  const getExercises = async () => {
    const res = await axios
      .get("/workout/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setExercises(response.data);
      });
  };

  ///end fetch exercise  code
  ///end fetch food  code

  //rendering function
  function render() {
    return exercises.map((object) => (
      <ExerciseItemHistory
        key={object._id}
        date={object.dateCreated}
        object={object}
      />
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

export default HistoryWorkout;
