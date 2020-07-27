import React, { useState, useEffect, useContext } from "react";
import Home from "./components/home";
import Resume from "./components/resume";
import Jobs from "./components/jobs";
import Courses from "./components/courses";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import { AuthContext } from "./context/auth/AuthContext";
import jwtDecode from "jsonwebtoken/decode";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(15),
    },
  },
}));

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const classes = useStyles();

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        light: darkTheme ? "#66666" : "#7289DA",
        main: darkTheme ? "#23272A" : "#7289DA",
      },
      secondary: {
        main: darkTheme ? "#7289DA" : "#7289DA",
      },
      icons: darkTheme ? "#7289DA" : "#fff",
      iconsAlt: darkTheme ? "#7289DA" : "#7289DA",
      background: {
        default: darkTheme ? "#303030" : "#f7f7fd",
      },
    },
  });

  const meme = responsiveFontSizes(theme);

  const { setToken, logout } = useContext(AuthContext);

  const checkLogin = () => {
    const localAuthToken = localStorage.getItem("authToken");
    if (localAuthToken) {
      const { exp } = jwtDecode(localAuthToken);
      if (exp < new Date().getTime()) {
        setToken(localAuthToken);
      } else {
        logout();
      }
    }
  };

  useEffect(checkLogin, []);

  return (
    <MuiThemeProvider theme={meme}>
      <BrowserRouter>
        <CssBaseline />
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Container>
          <main className={classes.main}>
            <Route exact path='/' component={Home} />
            <Switch>
              <Route exact path='/resume' component={Resume} />
            </Switch>
            <Route exact path='/jobs' component={Jobs} />
            <Route exact path='/courses' component={Courses} />
          </main>
        </Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
