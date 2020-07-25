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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
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
  checkbox: {
    marginLeft: theme.spacing(1),
  },
  changeForm: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
}));

const SignUp = ({ setAuthDialogOpen, setLoginForm }) => {
  const classes = useStyles();
  const { signup } = useContext(AuthContext);
  // const [user, setUser] = useState({
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   passw: "",
  //   contact: "",
  // });

  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    passw: "",
    contact: "",
  };

  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const onSubmit = (user) => {
    signup(user);
    setAuthDialogOpen(false);
  };

  return (
    <>
      <Container maxWidth='md' className={classes.title}>
        <TypoGraphy variant='h5'>SignUp to JobProvider</TypoGraphy>
        <IconButton onClick={() => setAuthDialogOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Container>
      <DialogContent>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='First Name'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='fname'
              inputRef={register({ required: true })}
              error={!!errors.fname}
              helperText={!!errors.fname && "This is a required field."}
            />
            <TextField
              label='Last Name'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='lname'
              inputRef={register({ required: true })}
              error={!!errors.lname}
              helperText={!!errors.lname && "This is a required field."}
            />
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='email'
              name='email'
              inputRef={register({ required: true })}
              error={!!errors.email}
              helperText={!!errors.email && "This is a required field."}
            />
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
              name='passw'
              inputRef={register({ required: true })}
              error={!!errors.passw}
              helperText={!!errors.passw && "This is a required field."}
            />
            <TextField
              label='Confirm Password'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='password'
              name='cpassword'
              inputRef={register({
                validate: (value) => value === watch("passw"),
              })}
              error={!!errors.cpassword}
              helperText={
                (errors.cpassword &&
                  errors.cpassword.type === "required" &&
                  "This is a required field.") ||
                (errors.cpassword &&
                  errors.cpassword.type === "validate" &&
                  "This Password doesn't match")
              }
            />
            <FormControlLabel
              className={classes.checkbox}
              control={<Checkbox />}
              label='I accept the Terms & Conditions'
            />
            <Box style={{ textAlign: "right" }}>
              <Button
                className={classes.input}
                type='submit'
                // onClick={handleSignup}
                color='secondary'
                variant='contained'
              >
                SignUp
              </Button>
            </Box>
          </form>
        </Container>
        <Divider />
        <Box className={classes.changeForm}>
          <TypoGraphy>
            Already have an account?{" "}
            <Button
              variant='outlined'
              size='small'
              onClick={() => setLoginForm(true)}
            >
              Login
            </Button>
          </TypoGraphy>
        </Box>
      </DialogContent>
    </>
  );
};

export default SignUp;
