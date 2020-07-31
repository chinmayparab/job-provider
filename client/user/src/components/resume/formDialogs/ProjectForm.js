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

const ProjectsForm = ({
  projectsFormOpen,
  setProjectFormOpen,
  project_list,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const localAuthToken = localStorage.getItem("authToken");
  const { addProjects } = useContext(ResumeContext);

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: project_list,
  });

  const onSubmit = (data) => {
    // addPersonalDetails(data);
    addProjects(localAuthToken, data);
    setProjectFormOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={projectsFormOpen}
      onClose={() => setProjectFormOpen(false)}
    >
      <Container maxWidth='md' className={classes.title}>
        <TypoGraphy variant='h5'>Add Job Details</TypoGraphy>
        <IconButton onClick={() => setProjectFormOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Container>
      <DialogContent>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='Project Title'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='title'
              inputRef={register({ required: true })}
              error={!!errors.title}
              helperText={!!errors.title && "This is a required field."}
            />

            <TextField
              label='Description'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='description'
              inputRef={register({ required: true })}
              error={!!errors.description}
              helperText={!!errors.description && "This is a required field."}
            />

            <TextField
              label='Project Link'
              variant='outlined'
              fullWidth
              size='small'
              color='secondary'
              className={classes.input}
              type='text'
              name='project_link'
              inputRef={register({ required: true })}
              error={!!errors.project_link}
              helperText={!!errors.project_link && "This is a required field."}
            />

            <TextField
              label='Start Date'
              type='date'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name='start_month'
              inputRef={register({ required: true })}
              error={!!errors.start_month}
              helperText={!!errors.start_month && "This is a required field."}
            />
            <TextField
              label='End Date'
              type='date'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name='end_month'
              inputRef={register({ required: true })}
              error={!!errors.end_month}
              helperText={!!errors.end_month && "This is a required field."}
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

export default ProjectsForm;
