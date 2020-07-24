import React, { useState } from "react";
import Home from "./components/home";
import Navbar from "./components/layout/Navbar";
import { AuthProvider } from "./context/auth/AuthContext";

import { BrowserRouter, Route } from "react-router-dom";

import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(25),
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
        main: darkTheme ? "#23272A" : "#7289DA",
      },
      secondary: {
        main: darkTheme ? "#7289DA" : "#7289DA",
      },
      icons: darkTheme ? "#7289DA" : "#fff",
      iconsAlt: darkTheme ? "#7289DA" : "#7289DA",
      background: {
        default: darkTheme ? "#303030" : "#e1e2e1",
      },
    },
  });

  return (
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Container>
            <main className={classes.main}>
              <Route exact path='/' component={Home} />
              {/* <Route exact path='/jobs' component={Jobs} />
            <Route exact path='/courses' component={Courses} /> */}
            </main>
          </Container>
        </BrowserRouter>
      </MuiThemeProvider>
    </AuthProvider>
  );
};

export default App;
