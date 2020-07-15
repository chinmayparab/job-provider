import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import TypoGraphy from "@material-ui/core/TypoGraphy";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(1),
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
  },
  changeForm: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
}));

const Login = ({ setAuthDialogOpen, setLoginForm }) => {
  const classes = useStyles();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
    setAuthDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth='md' className={classes.title}>
        <TypoGraphy variant='h5'>Login to JobProvider</TypoGraphy>
        <IconButton onClick={() => setAuthDialogOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Container>
      <DialogContent>
        <Container>
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            size='small'
            color='secondary'
            className={classes.input}
          />

          <TextField
            label='Password'
            variant='outlined'
            fullWidth
            size='small'
            color='secondary'
            className={classes.input}
            type='password'
          />
        </Container>
        <Box style={{ textAlign: "right" }}>
          <Button
            className={classes.input}
            onClick={handleLogin}
            color='secondary'
            variant='contained'
          >
            Login
          </Button>
        </Box>
        <Divider />
        <Box className={classes.changeForm}>
          <TypoGraphy>
            Dont have an account?{"  "}
            <Button
              variant='outlined'
              size='small'
              onClick={() => setLoginForm(false)}
            >
              Sign Up
            </Button>
          </TypoGraphy>
        </Box>
      </DialogContent>
    </>
  );
};

export default Login;
