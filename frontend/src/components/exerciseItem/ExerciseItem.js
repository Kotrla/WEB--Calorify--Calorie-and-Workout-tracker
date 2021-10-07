import { React } from "react";
import axios from "axios";
import { useStyles } from "./styles";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { Grid, Container, Typography } from "@material-ui/core";
function ExerciseItem(props) {
  async function removeItem() {
    const res = await axios
      .delete("/workout/", {
        data: {
          name: props.name,
          reps: props.reps,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(props.updateFunction)
      .catch((err) => alert(err.response.data.toString()));
  }

  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Container>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={3} sm={6}>
            <Typography variant="subtitle1">{props.name}</Typography>
          </Grid>

          <Grid item xs={5} sm={2}>
            <Typography style={{ margin: "0", padding: "0", color: "#1f5699" }}>
              Reps: {props.reps}
            </Typography>
          </Grid>
          {props.deleteButton && (
            <RemoveCircleRoundedIcon
              className={classes.delButton}
              xs={1}
              style={{ margin: "0", padding: "0" }}
              onClick={removeItem}
            ></RemoveCircleRoundedIcon>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default ExerciseItem;
