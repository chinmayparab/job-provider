import React, { useContext } from "react";
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

import { ResumeContext } from "../../../context/resume/ResumeContext";

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

const EducationForm = ({
  educationFormOpen,
  setEducationFormOpen,
  edu_detail,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const localAuthToken = localStorage.getItem("authToken");
  const { addEdu } = useContext(ResumeContext);

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: edu_detail,
  });

  const onSubmit = (data) => {
    addEdu(localAuthToken, data);
    setEducationFormOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={educationFormOpen}
      onClose={() => setEducationFormOpen(false)}
    >
      <Container maxWidth='md' className={classes.title}>
        <TypoGraphy variant='h5'>Add Educational Details</TypoGraphy>
        <IconButton onClick={() => setEducationFormOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Container>
      <DialogContent>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='College'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='college'
              inputRef={register({ required: true })}
              error={!!errors.college}
              helperText={!!errors.college && "This is a required field."}
            />

            <TextField
              label='Degree'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='degree'
              inputRef={register({ required: true })}
              error={!!errors.degree}
              helperText={!!errors.degree && "This is a required field."}
            />

            <TextField
              label='Stream'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='stream'
              inputRef={register({ required: true })}
              error={!!errors.stream}
              helperText={!!errors.stream && "This is a required field."}
            />

            <TextField
              label='Start Date'
              type='date'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name='start_year'
              inputRef={register({ required: true })}
              error={!!errors.start_year}
              helperText={!!errors.start_year && "This is a required field."}
            />
            <TextField
              label='End Date'
              type='date'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name='end_date'
              inputRef={register({ required: true })}
              error={!!errors.end_date}
              helperText={!!errors.end_date && "This is a required field."}
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

export default EducationForm;
