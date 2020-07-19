import React from "react";

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
          <TextField
            label='Full Name'
            variant='outlined'
            fullWidth
            size='small'
            color='secondary'
            className={classes.input}
          />
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
          <TextField
            label='Confirm Password'
            variant='outlined'
            fullWidth
            size='small'
            color='secondary'
            className={classes.input}
            type='password'
          />
          <FormControlLabel
            className={classes.checkbox}
            control={<Checkbox />}
            label='I accept the Terms & Conditions'
          />
        </Container>
        <Box style={{ textAlign: "right" }}>
          <Button
            className={classes.input}
            onClick={() => setAuthDialogOpen(false)}
            color='secondary'
            variant='contained'
          >
            SignUp
          </Button>
        </Box>
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
