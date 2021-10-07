import { React, useState } from "react";
import axios from "axios";
import { useStyles } from "./styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Container, Typography } from "@material-ui/core";
import ExerciseItem from "./ExerciseItem";
function ExerciseItemHistory(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((prev) => !prev);
  };

  function showMore() {
    return props.object.exercises.map((ex, index) => (
      <ExerciseItem
        key={index}
        name={ex.name}
        reps={ex.reps}
        deleteButton={false}
        style={{ height: "50px" }}
      />
    ));
  }

  const classes = useStyles();
  return (
    <>
      <div className={classes.bgDate}>
        <Container>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={3} sm={6}>
              <Typography variant="subtitle1">{props.date}</Typography>
            </Grid>

            <ExpandMoreIcon
              className={classes.button}
              xs={1}
              onClick={handleShow}
            ></ExpandMoreIcon>
          </Grid>
        </Container>
      </div>
      {show && showMore()}
    </>
  );
}

export default ExerciseItemHistory;
