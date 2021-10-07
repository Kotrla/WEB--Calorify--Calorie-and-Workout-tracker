import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import Profile from "./components/pages/profile/Profile";
import Meals from "./components/pages/meals/Meals";
import Workouts from "./components/pages/workouts/Workouts";
import Dashboard from "./components/pages/dashboard/Dashboard";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";

import Header from "./components/header/Header.js";
import { Container } from "@material-ui/core";
function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/register">
            <RegisterForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <>
            <Header />
            <>
              <Route exact path="/">
                <Container>
                  <Dashboard />
                </Container>
              </Route>
              <Route exact path="/profile">
                <Container>
                  <Profile />
                </Container>
              </Route>
              <Route exact path="/meals">
                <Container>
                  <Meals />
                </Container>
              </Route>
              <Route exact path="/workouts">
                <Container>
                  <Workouts />
                </Container>
              </Route>
            </>
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
