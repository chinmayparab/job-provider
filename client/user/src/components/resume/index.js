import React, { useEffect, useContext } from "react";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../context/auth/AuthContext";
import { ResumeContext } from "../../context/resume/ResumeContext";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import JobsDetails from "./JobsDetails";
import ProjectDetails from "./ProjectDetails";

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
  extraContainer: {
    margin: theme.spacing(0, 5),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(0),
    },
  },
  dividePrettier: {
    margin: theme.spacing(2, 0),
  },
}));

const Resume = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { resume, fetchResume } = useContext(ResumeContext);
  const localAuthToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchResume(localAuthToken);
    // eslint-disable-next-line
  }, []);

  const {
    personal_details,
    edu_details,
    job_details,
    projects_list,
    skills_list,
    trainings_list,
    work_examples,
  } = resume;

  return (
    <>
      <Typography
        component='h1'
        variant='h4'
        align='center'
        className={classes.title}
      >
        Resume
      </Typography>

      <Container className={classes.extraContainer}>
        <Paper elevation={24} className={classes.paper}>
          <Container className={classes.resumeContainer}>
            <Grid container spacing={3}>
              <PersonalDetails
                user={user}
                personal_details={personal_details}
              />
            </Grid>

            <Divider className={classes.dividePrettier} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Typography component='h6' variant='h6'>
                  Education
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <EducationDetails user={user} edu_details={edu_details} />
              </Grid>
            </Grid>

            <Divider className={classes.dividePrettier} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Typography component='h6' variant='h6'>
                  Jobs
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <JobsDetails user={user} job_details={job_details} />
              </Grid>
            </Grid>

            <Divider className={classes.dividePrettier} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Typography component='h6' variant='h6'>
                  Projects
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <ProjectDetails user={user} projects_list={projects_list} />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </>
  );
};

export default Resume;
