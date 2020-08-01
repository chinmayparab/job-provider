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
import JobCard from "./JobCard";

import { useTranslation } from "react-i18next";

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
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    // fetchJobs();
    console.log(authToken);
    // eslint-disable-next-line
  }, []);

  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Container>
          <Typography gutterBottom={true} variant='h5'>
            {t("View all jobs")}
          </Typography>
          <Grid container spacing={2}>
            {jobs && jobs.length > 0 ? (
              jobs.map((job, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <JobCard job={job} />
                </Grid>
              ))
            ) : (
              <Typography variant='subtitle2'>{t("No jobs added")}</Typography>
            )}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default Jobs;
