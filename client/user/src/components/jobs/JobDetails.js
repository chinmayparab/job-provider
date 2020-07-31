import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { JobsContext } from "../../context/jobs/JobsContext";
import JobDialog from "./JobDialog";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: "0 8px 8px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const JobCards = () => {
  const classes = useStyles();
  const [jobDialogOpen, setJobDialogOpen] = useState(false);

  const { current } = useContext(JobsContext);

  const {
    job_id,
    stipend,
    pos_names,
    qualification,
    no_postions,
    interview_mode,
    description,
  } = current;

  const onSubmit = () => {
    setJobDialogOpen(true);
  };

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {interview_mode}
        </Typography>
        <Typography variant='h5' component='h2'>
          {pos_names}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {stipend}
        </Typography>
        <Typography variant='body2' component='p'>
          {qualification}
          <br />
          Number of Openings: {no_postions}
        </Typography>
        <Divider />
        <Typography variant='body1' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={onSubmit}
        >
          Apply Now
        </Button>
      </CardActions>
      <JobDialog
        jobDialogOpen={jobDialogOpen}
        setJobDialogOpen={setJobDialogOpen}
        job_id={job_id}
      />
    </Card>
  );
};

export default JobCards;
