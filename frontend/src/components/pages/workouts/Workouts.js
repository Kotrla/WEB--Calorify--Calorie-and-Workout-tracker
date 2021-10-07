import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
import Backdrop from "../../modal/Backdrop.js";
import AddExerciseModal from "../../modal/AddExerciseModal";
import ExerciseItem from "../../exerciseItem/ExerciseItem.js";
import HistoryWorkout from "../../modal/HistoryWorkout";
export default function Workouts() {
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
    getExercises();
  }, []);

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  //end user code

  ///fetch exercise start code
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

  const [showModalAdd, setShowModalAdd] = useState(false);
  const openModalAdd = () => {
    setShowModalAdd((prev) => !prev);
  };

  const [showModalWorkout, setShowModalWorkout] = useState(false);
  const openModalWorkout = () => {
    setShowModalWorkout((prev) => !prev);
  };

  let date = new Date().toLocaleDateString("en-US");
  function renderExercise(d) {
    return exercises
      .filter((ef) => ef.dateCreated.includes(d))
      .map((object) =>
        object.exercises.map((item, index) => (
          <ExerciseItem
            key={index}
            updateFunction={getExercises}
            deleteButton={true}
            name={item.name}
            reps={item.reps}
          />
        ))
      );
  }

  const classes = useStyles();
  return (
    <>
      {showModalWorkout && <HistoryWorkout closeModal={openModalWorkout} />}
      {showModalWorkout && <Backdrop onClick={openModalWorkout} />}

      {showModalAdd && (
        <AddExerciseModal
          modalFunction={openModalAdd}
          updateList={getExercises}
        />
      )}
      {showModalAdd && <Backdrop onClick={openModalAdd} />}
      <div className={classes.container}>
        <Grid container direction="row">
          <Container>
            <Grid
              container
              justify="space-between"
              className={classes.smallContainer}
            >
              <Button
                variant="outlined"
                className={classes.button}
                onClick={openModalWorkout}
              >
                History
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={openModalAdd}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.titleDiv}>
              <Container>
                <Typography className={classes.label}>Exercises:</Typography>
              </Container>
            </Grid>
            {renderExercise(date)}
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
