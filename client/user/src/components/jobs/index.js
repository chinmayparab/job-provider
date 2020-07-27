import React, { useEffect, useContext } from "react";
import Sticky from "react-stickynode";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import { JobsContext } from "../../context/jobs/JobsContext";
import JobCards from "./JobCards";
import JobDetails from "./JobDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: theme.palette.text.secondary,
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2, 0),
    },
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  resumeContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  },
  head: {
    margin: theme.spacing(2, 0),
    // justifyContent: "spaceBetween",
  },
}));

const Jobs = () => {
  const classes = useStyles();
  const { setCurrent, current, jobs, fetchJobs } = useContext(JobsContext);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box display='flex' justifyContent='space-between' my={2}>
        <Button variant='outlined' color='secondary'>
          Mumbai
        </Button>
        <Button variant='outlined' color='secondary'>
          Mumbai
        </Button>
        <Button variant='outlined' color='secondary'>
          Mumbai
        </Button>
        <Button variant='outlined' color='secondary'>
          Mumbai
        </Button>
        <Button variant='outlined' color='secondary'>
          Mumbai
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          {jobs && jobs.map((job) => <JobCards job={job} />)}
        </Grid>
        <Grid item xs={12} md={7}>
          <Sticky enabled={true} top={80}>
            <JobDetails current={current} />
          </Sticky>
        </Grid>
      </Grid>
    </>
  );
};

export default Jobs;
