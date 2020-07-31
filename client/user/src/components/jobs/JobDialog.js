import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { JobsContext } from "../../context/jobs/JobsContext";

const JobDialog = ({ jobDialogOpen, setJobDialogOpen, job_id }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { applyJob } = useContext(JobsContext);
  const localAuthToken = localStorage.getItem("authToken");

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { answer: "", job_id: job_id },
  });

  const onSubmit = (data) => {
    applyJob(data, job_id, localAuthToken);
    setJobDialogOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={jobDialogOpen}
      onClose={() => setJobDialogOpen(false)}
    >
      <DialogTitle id='simple-dialog-title'>Apply!</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <TextField
              id='outlined-secondary'
              label='Outlined secondary'
              variant='outlined'
              color='secondary'
              type='text'
              name='answer'
              inputRef={register({ required: true })}
              error={!!errors.answer}
              helperText={!!errors.answer && "This is a required field."}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color='secondary'>
            Apply
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default JobDialog;
