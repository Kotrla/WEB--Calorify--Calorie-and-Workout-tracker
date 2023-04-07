import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Pie } from "react-chartjs-2";

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

export default function Dashboard() {
  //beginning user auth
  const us = [];
  const [user, setUser] = useState(us);
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
    getUserData();
    getTargets();
  }, []);

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  //end user auth code

  //get userInfo
  let userData = {
    personal: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      goal: "",
      date: "",
    },

    credentials: {
      email: "",
      password: "",
    },

    stats: {
      weight: "",
      height: "",
    },

    needs: {
      kcal: "",
      protein: "",
      carbs: "",
      fats: "",
    },
  };

  const [userF, setUserF] = useState(userData);
  const getUserData = async () => {
    const res = await axios
      .get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserF(response.data[0]);
      });
  };

  let targetBase = {
    user: "",

    kcal: "0",
    protein: "0",
    carbs: "0",
    fats: "0",

    dateCreated: "",
  };

  const [targets, setTargets] = useState(targetBase);
  const getTargets = async () => {
    const res = await axios
      .get("/target/daily", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data[0]) setTargets(response.data[0]);
      });
  };

  function onClickInfo() {
    return history.push("/profile");
  }

  function onClickFood() {
    return history.push("/meals");
  }

  //end of userInfo
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Container>
          { userF &&
            <Grid container justify="space-around">
            <Grid item xs={12} className={classes.titleDiv}>
              <Container>
                Welcome {userF.personal.firstName}, here is an overview of your
                profile!
              </Container>
            </Grid>
            <Grid container>
              <Grid item xs={12} className={classes.titleDiv}>
                <Container>
                  <Grid container className={classes.smallContainer}>
                    <Typography className={classes.label}>
                      Your Target Numbers:
                    </Typography>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={onClickInfo}
                    >
                      Update
                    </Button>
                  </Grid>
                </Container>
              </Grid>

              <Grid item xs={12} className={classes.contentDiv}>
                <Container>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={6}>
                      <Grid container direction="column">
                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Calories:</Typography>
                            <Typography>{userF.needs.kcal} kcal</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Protein:</Typography>
                            <Typography>{userF.needs.protein} g</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Carbs:</Typography>
                            <Typography>{userF.needs.carbs} g</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Fats:</Typography>
                            <Typography>{userF.needs.fats} g</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Goal:</Typography>
                            <Typography>{userF.personal.goal}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Pie
                        height="350"
                        width="350"
                        data={{
                          labels: ["Fats", "Carbs", "Protein"],

                          datasets: [
                            {
                              data: [
                                Number(userF.needs.fats),
                                Number(userF.needs.carbs),
                                Number(userF.needs.protein),
                              ],
                              backgroundColor: ["red", "orange", "blue"],
                            },
                          ],
                        }}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} className={classes.titleDiv}>
                <Container>
                  <Grid container className={classes.smallContainer}>
                    <Typography className={classes.label}>
                      Your Daily Summary:
                    </Typography>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={onClickFood}
                    >
                      Add food
                    </Button>
                  </Grid>
                </Container>
              </Grid>

              <Grid item xs={12} className={classes.contentDiv}>
                <Container>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={6}>
                      <Grid container direction="column">
                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Calories:</Typography>
                            <Typography>{targets.kcal} kcal</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Protein:</Typography>
                            <Typography>{targets.protein} g</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Carbs:</Typography>
                            <Typography>{targets.carbs} g</Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={5} className={classes.txt}>
                          <Grid container justify="space-between">
                            <Typography>Fats:</Typography>
                            <Typography>{targets.fats} g</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Pie
                        height={400}
                        width={400}
                        data={{
                          labels: ["Fats", "Carbs", "Protein"],

                          datasets: [
                            {
                              data: [
                                Number(targets.fats),
                                Number(targets.carbs),
                                Number(targets.protein),
                              ],
                              backgroundColor: ["red", "orange", "blue"],
                            },
                          ],
                        }}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
            <Grid
              container
              justify="space-between"
              className={classes.spaceContainer}
            ></Grid>
            </Grid>
          }
        </Container>
      </div>
    </>
  );
}
