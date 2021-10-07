import { React, useState } from "react";
import axios from "axios";
import { useStyles } from "./styles";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { Button, Grid, Container, Typography } from "@material-ui/core";
function FoodItem(props) {
  async function removeItem() {
    const res = await axios
      .delete("/meals/", {
        data: {
          id: props.id,
          name: props.name,
          kcal: props.kcal,
          protein: props.protein,
          carbs: props.carbs,
          fats: props.fats,
          meal: props.meal,
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
          </Grid>{" "}
          <Grid item xs={4} sm={3}>
            {props.grams && (
              <Typography variant="subtitle1">{props.grams} grams</Typography>
            )}
            <Typography variant="subtitle1">{props.kcal} kcal</Typography>
          </Grid>
          <Grid item xs={3} sm={2}>
            <Typography
              className={classes.txt}
              style={{ margin: "0", padding: "0", color: "#1f5699" }}
            >
              Protein: {props.protein} g
            </Typography>
            <Typography
              className={classes.txt}
              style={{ margin: "0", padding: "0", color: "#c77a00" }}
            >
              Carbs: {props.carbs} g
            </Typography>
            <Typography
              className={classes.txt}
              style={{ margin: "0", padding: "0", color: "#f0790a" }}
            >
              Fats: {props.fats} g
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

export default FoodItem;
