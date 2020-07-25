import React, { useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  resumeContainer: {
    padding: theme.spacing(5),
  },
}));

const Resume = () => {
  const classes = useStyles();
  const { loadUser, user } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Container>
        <Typography
          component='h1'
          variant='h4'
          align='center'
          className={classes.title}
        >
          Resume
        </Typography>

        <Paper>
          <Container className={classes.resumeContainer}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography component='h3' variant='h4'>
                  Hello {user && user.fname}
                </Typography>
                <Typography component='h6' variant='h6'>
                  chinmayparab1999@gmail.com
                  <p>+91 9004966677</p>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Container>
    </>
  );
};

export default Resume;
