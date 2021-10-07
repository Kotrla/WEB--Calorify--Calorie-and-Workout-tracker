import { useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useStyles } from "./registerStyles";
import {
  Button,
  Typography,
  Grid,
  TextField,
  MenuItem,
} from "@material-ui/core";

export default function RegisterForm(props) {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const heightInputRef = useRef();
  const weightInputRef = useRef();
  const genderInputRef = useRef();
  const dateInputRef = useRef();
  const goalInputRef = useRef();

  let history = useHistory();

  function goBack() {
    history.push("login");
  }

  async function submitHandler(event) {
    event.preventDefault();
    const firstNameRef = firstNameInputRef.current.value;
    const lastNameRef = lastNameInputRef.current.value;
    const emailRef = emailInputRef.current.value;
    const passwordRef = passwordInputRef.current.value;
    const heightRef = heightInputRef.current.value;
    const weightRef = weightInputRef.current.value;
    const genderRef = genderInputRef.current.value;
    const dateRef = dateInputRef.current.value;
    const goalRef = goalInputRef.current.value;

    const userData = {
      personal: {
        firstName: firstNameRef,
        lastName: lastNameRef,
        gender: genderRef,
        goal: goal,
        date: dateRef,
      },
      credentials: {
        email: emailRef,
        password: passwordRef,
      },
      stats: {
        weight: weightRef,
        height: heightRef,
      },
    };

    const reg = await axios
      .post("/users/register", userData, {
        headers: { "Content-Type": "application/json" },
      })
      .catch((error) => {
        alert(error.response.data.toString());
      });

    if (reg) {
      alert("User registered succesfully");
      history.push("login");
    } else {
      console.log("Error registering the user!");
    }
  }

  if (localStorage.getItem("token")) {
    history.push("/");
  }

  const genders = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  const goals = [
    {
      value: "Lose fat",
      label: "Lose fat",
    },
    {
      value: "Maintain weight",
      label: "Maintain weight",
    },
    {
      value: "Gain muscle",
      label: "Gain muscle",
    },
  ];

  const [goal, setGoal] = useState("");
  const handleChangeGoal = (event) => {
    setGoal(event.target.value);
  };
  const [gender, setGender] = useState("");
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <form onSubmit={submitHandler} className={classes.container}>
        <Grid container justify="flex-start" spacing={1}>
          <ArrowBackIcon className={classes.ArrowBackIcon} onClick={goBack} />
        </Grid>
        <Typography className={classes.title}>Register</Typography>

        <TextField
          required
          fullWidth
          label="First name"
          name="firstName"
          size="medium"
          variant="outlined"
          inputRef={firstNameInputRef}
        />
        <TextField
          required
          fullWidth
          label="Last name"
          name="lastName"
          size="medium"
          variant="outlined"
          inputRef={lastNameInputRef}
        />
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          size="medium"
          variant="outlined"
          inputRef={emailInputRef}
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          name="password"
          size="medium"
          variant="outlined"
          inputRef={passwordInputRef}
        />

        <TextField
          required
          fullWidth
          label="Weight"
          type="number"
          size="medium"
          variant="outlined"
          inputRef={weightInputRef}
        />

        <TextField
          required
          fullWidth
          label="Height"
          type="number"
          size="medium"
          variant="outlined"
          inputRef={heightInputRef}
        />
        <TextField
          label="Gender"
          size="medium"
          variant="outlined"
          select
          value={gender}
          onChange={handleChangeGender}
          required
          fullWidth
          inputRef={genderInputRef}
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="medium"
          variant="outlined"
          required
          fullWidth
          type="date"
          inputRef={dateInputRef}
        />

        <TextField
          label="Fitness Goal"
          size="medium"
          variant="outlined"
          select
          required
          fullWidth
          value={goal}
          inputRef={goalInputRef}
          onChange={handleChangeGoal}
        >
          {goals.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="small"
          fullWidth
        >
          Register
        </Button>
      </form>
    </div>
  );
}
