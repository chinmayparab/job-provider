import React, { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

import { useForm } from "react-hook-form";
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
  // const [user, setUser] = useState({ id: "", password: "" });
  const initialValues = { contact: "", password: "" };

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });
  // const onSubmit = (data) => console.log(data);

  const onSubmit = (user) => {
    login(user);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='Contact'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='tel'
              name='contact'
              inputRef={register({ required: true, pattern: /^[0-9]{10}$/ })}
              error={!!errors.contact}
              helperText={
                (errors.contact &&
                  errors.contact.type === "required" &&
                  "This is a required field.") ||
                (errors.contact &&
                  errors.contact.type === "pattern" &&
                  "Please Specify a valid Phone Number.")
              }
            />

            <TextField
              label='Password'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='password'
              name='password'
              inputRef={register({ required: true })}
              error={!!errors.password}
              helperText={!!errors.password && "This is a required field."}
            />
            <Box style={{ textAlign: "right" }}>
              <Button
                className={classes.input}
                type='submit'
                // onClick={handleLogin}
                color='secondary'
                variant='contained'
              >
                Login
              </Button>
            </Box>
          </form>
        </Container>
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
