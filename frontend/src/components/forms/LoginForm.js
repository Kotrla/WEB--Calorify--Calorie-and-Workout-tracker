import { React, useRef } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";

import { useStyles } from "./loginStyles";
import { Button, Typography, Grid, TextField } from "@material-ui/core";

export default function LoginForm() {
  const emailInputRef1 = useRef();
  const passwordInputRef1 = useRef();

  const classes = useStyles();
  let history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();
    const emailRef = emailInputRef1.current.value;
    const passwordRef = passwordInputRef1.current.value;
    const userData = {
      email: emailRef,
      password: passwordRef,
    };

    const res = await axios
      .post(
        "/users/login",
        { email: userData.email, password: userData.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        alert(error.response.data.toString());
      });

    if (res) {
      alert("Login succesfull");
      localStorage.setItem("token", res.data.token);
      history.push("/");
    } else {
      console.log("Error logging the user!");
    }
  }

  function goToRegister() {
    history.push("/register");
  }

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  return (
    <div className={classes.bg}>
      <form onSubmit={submitHandler} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.title}>Calorify</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              size="medium"
              variant="outlined"
              inputRef={emailInputRef1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              size="medium"
              type="password"
              variant="outlined"
              inputRef={passwordInputRef1}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              color="primary"
              fullWidth
              type="submit"
              variant="contained"
            >
              Log in
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              fullWidth
              onClick={goToRegister}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
