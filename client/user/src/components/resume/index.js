import React, { useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/auth/AuthContext";

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
  dividePrettier: {
    margin: theme.spacing(2, 0),
  },
}));

const Resume = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

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

      <Paper elevation={24} className={classes.paper}>
        <Container className={classes.resumeContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography component='h6' variant='h6'>
                {user && user.fname} {user && user.lname}
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                {user && user.email}
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                {user && user.phone_no}
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.dividePrettier} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Typography component='h6' variant='h6'>
                Education
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography component='h6' variant='h6'>
                Degree Name
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                Name of University
              </Typography>
              <Typography component='h6' variant='subtitle1'>
                From and To Dates
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

export default Resume;
