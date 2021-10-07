import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "./styles";
export default function Profile() {
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
    setUser({ date: res.data.date });
  };
  useEffect(() => {
    getUser();
    getUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  if (!localStorage.getItem("token")) {
    history.push("/login");
  }

  //end user code

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

        setFirstName(response.data[0].personal.firstName);
        setLastName(response.data[0].personal.lastName);
        setEmail(response.data[0].credentials.email);
        setGender(response.data[0].personal.gender);
        setBirthday(response.data[0].personal.date);
        setHeight(response.data[0].stats.height);
        setWeight(response.data[0].stats.weight);
        setGoal(response.data[0].personal.goal);
        setCalories(response.data[0].needs.kcal);
        setProtein(response.data[0].needs.protein);
        setCarbs(response.data[0].needs.carbs);
        setFats(response.data[0].needs.fats);
      });
  };

  const classes = useStyles();

  const genders = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
  ];
  const goals = [
    {
      value: "Lose fat",
    },
    {
      value: "Maintain weight",
    },
    {
      value: "Gain muscle",
    },
  ];

  const [firstName, setFirstName] = useState("");
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const [lastName, setLastName] = useState("");
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };
  const [email, setEmail] = useState("");
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const [goal, setGoal] = useState("");
  const handleChangeGoal = (event) => {
    setGoal(event.target.value);
  };
  const [gender, setGender] = useState("");
  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const [birthday, setBirthday] = useState("");
  const birthdayChange = (event) => {
    setBirthday(event.target.value);
  };
  const [height, setHeight] = useState("");
  const heightChange = (event) => {
    setHeight(event.target.value);
  };
  const [weight, setWeight] = useState("");
  const weightChange = (event) => {
    setWeight(event.target.value);
  };
  const [protein, setProtein] = useState("");
  const proteinChange = (event) => {
    let proteinN = Number(protein);
    let kcalN = Number(calories);
    if (proteinN < event.target.value) {
      let x = event.target.value - proteinN;

      setCalories(kcalN + x * 4);
    }

    if (proteinN > event.target.value) {
      let x = proteinN - event.target.value;

      setCalories(kcalN - x * 4);
    }

    setProtein(event.target.value);
  };
  const [carbs, setCarbs] = useState("");
  const carbsChange = (event) => {
    let carbsN = Number(carbs);
    let kcalN = Number(calories);
    if (carbsN < event.target.value) {
      let x = event.target.value - carbsN;

      setCalories(kcalN + x * 4);
    }

    if (carbsN > event.target.value) {
      let x = carbsN - event.target.value;

      setCalories(kcalN - x * 4);
    }

    setCarbs(event.target.value);
  };
  const [fats, setFats] = useState("");
  const fatsChange = (event) => {
    let fatsN = Number(fats);
    let kcalN = Number(calories);

    if (fatsN < event.target.value) {
      let x = event.target.value - fatsN;

      setCalories(kcalN + x * 9);
    }
    if (fatsN > event.target.value) {
      let x = fatsN - event.target.value;

      setCalories(kcalN - x * 9);
    }

    setFats(event.target.value);
  };
  const [calories, setCalories] = useState("");
  const caloriesChange = (event) => {
    let carbsN = Number(carbs);
    let kcalN = Number(calories);
    if (kcalN < event.target.value) {
      let x = event.target.value - kcalN;

      setCarbs(carbsN + x / 4);
    }

    if (calories > event.target.value) {
      let x = kcalN - event.target.value;

      setCarbs(carbsN - x / 4);
    }
    setCalories(event.target.value);
  };
  async function updateMacros() {
    let data = {
      needs: {
        kcal: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
      },
    };

    const res = await axios.put("/users/updateMacros", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async function updateData() {
    userData = {
      _id: userF._id,
      personal: {
        firstName: firstName,
        lastName: lastName,
        age: "",
        gender: gender,
        goal: goal,
        date: birthday,
      },

      credentials: {
        email: email,
        password: userF.credentials.password,
      },

      stats: {
        weight: weight,
        height: height,
      },

      needs: {
        kcal: "",
        protein: "",
        carbs: "",
        fats: "",
      },
    };

    const res = await axios
      .put("/users/update", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);

        setCalories(Number(response.data.needs.kcal));
        setProtein(Number(response.data.needs.protein));
        setCarbs(Number(response.data.needs.carbs));
        setFats(Number(response.data.needs.fats));
      });
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <h2 className={classes.titles}>Personal information</h2>
            <Container>
              <Typography className={classes.label}>First name:</Typography>
              <TextField
                value={firstName}
                onChange={handleChangeFirstName}
                className={classes.info}
                variant="filled"
                id="firstName"
              />

              <Typography className={classes.label}>Last name:</Typography>
              <TextField
                value={lastName}
                onChange={handleChangeLastName}
                className={classes.info}
                variant="filled"
                id="lastName"
              />

              <Typography className={classes.label}>Email:</Typography>
              <TextField
                value={email}
                onChange={handleChangeEmail}
                className={classes.info}
                variant="filled"
                id="email"
                type="email"
              />

              <Typography className={classes.label}>Weight:</Typography>
              <TextField
                value={weight}
                onChange={weightChange}
                className={classes.info}
                variant="filled"
                type="number"
              />
              <Typography className={classes.label}>Height:</Typography>
              <TextField
                value={height}
                onChange={heightChange}
                className={classes.info}
                variant="filled"
                type="number"
              />
              <Typography className={classes.label}>Gender:</Typography>
              <TextField
                className={classes.info}
                variant="filled"
                select
                value={gender}
                id="gender"
                onChange={handleChangeGender}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
              <Typography className={classes.label}>Birthday:</Typography>
              <TextField
                value={birthday}
                onChange={birthdayChange}
                className={classes.info}
                variant="filled"
                id="birthday"
                type="date"
              />

              <Typography className={classes.label}>Fitness Goal:</Typography>
              <TextField
                className={classes.info}
                variant="filled"
                select
                value={goal}
                id="goal"
                onChange={handleChangeGoal}
              >
                {goals.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                size="large"
                fullWidth
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={updateData}
              >
                Update info
              </Button>
            </Container>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
            <h2 className={classes.titles}>
              Daily recommended caloric intake:
            </h2>
            <Container>
              <Typography className={classes.label}>Calories:</Typography>
              <TextField
                value={calories}
                onChange={caloriesChange}
                className={classes.info}
                variant="filled"
                type="number"
              />
              <Typography className={classes.label}>Protein:</Typography>
              <TextField
                type="number"
                value={protein}
                onChange={proteinChange}
                className={classes.info}
                variant="filled"
              />
              <Typography className={classes.label}>Carbohydrates:</Typography>
              <TextField
                type="number"
                value={carbs}
                onChange={carbsChange}
                className={classes.info}
                variant="filled"
              />
              <Typography className={classes.label}>Fats:</Typography>
              <TextField
                type="number"
                value={fats}
                onChange={fatsChange}
                className={classes.info}
                variant="filled"
              />
              <Button
                size="large"
                fullWidth
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={updateMacros}
              >
                Update macros
              </Button>
            </Container>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
