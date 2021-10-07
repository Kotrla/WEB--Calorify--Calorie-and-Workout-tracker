import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { useStyles, useTheme } from "./styles";

import {
  Button,
  Typography,
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
function Header() {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  {
    /*  menu item starting,*/
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClick = () => {
    setAnchorEl(null);
  };
  {
    /*  menu item ending,*/
  }
  return (
    <div className={classes.root}>
      <Container>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography className={classes.txt}>Calorify</Typography>
          </Grid>
          <Grid item>
            <Toolbar>
              {isMobile ? (
                <div>
                  <IconButton
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClick();
                        history.push("/");
                      }}
                    >
                      Home
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick();
                        history.push("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick();
                        history.push("/meals");
                      }}
                    >
                      Meals
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick();
                        history.push("/workouts");
                      }}
                    >
                      Workouts
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleMenuClick();
                        logout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <div style={{ margin: "0" }}>
                  <Link className={classes.link} to="/">
                    Home
                  </Link>
                  <Link className={classes.link} to="/profile">
                    Profile
                  </Link>
                  <Link className={classes.link} to="/meals">
                    Meals
                  </Link>
                  <Link className={classes.link} to="/workouts">
                    Workouts
                  </Link>
                  <Button
                    style={{ margin: "0" }}
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </Toolbar>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Header;
