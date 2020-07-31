import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import TypoGraphy from "@material-ui/core/TypoGraphy";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";

// import { AuthContext } from "../../context/auth/AuthContext";

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

const PersonalForm = ({
  personalFormOpen,
  setPersonalFormOpen,
  personal_details,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: personal_details,
  });

  const onSubmit = (data) => {
    // addPersonalDetails(data);
    console.log(data);
    setPersonalFormOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={personalFormOpen}
      onClose={() => setPersonalFormOpen(false)}
    >
      <Container maxWidth='md' className={classes.title}>
        <TypoGraphy variant='h5'>Add Personal Details</TypoGraphy>
        <IconButton onClick={() => setPersonalFormOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Container>
      <DialogContent>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='Email ID'
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
              label='Phone Number'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='tel'
              name='phone_no'
              inputRef={register({ required: true, pattern: /^[0-9]{10}$/ })}
              error={!!errors.phone_no}
              helperText={
                (errors.phone_no &&
                  errors.phone_no.type === "required" &&
                  "This is a required field.") ||
                (errors.phone_no &&
                  errors.phone_no.type === "pattern" &&
                  "Please Specify a valid Phone Number.")
              }
            />

            <TextField
              label='Current Location'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='location'
              inputRef={register({ required: true })}
              error={!!errors.location}
              helperText={!!errors.location && "This is a required field."}
            />

            <Box style={{ textAlign: "right" }}>
              <Button
                className={classes.input}
                type='submit'
                color='secondary'
                variant='contained'
              >
                Save
              </Button>
            </Box>
          </form>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalForm;
