import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import HomeSearch from "./HomeSearch";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),

    marginTop: theme.spacing(25),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(15),
    },
  },
  btoon: {
    padding: theme.spacing(2),
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={8} square className={classes.paper}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}
      >
        <Grid item md xs={12}>
          <HomeSearch
            // title='What?'
            label='Engineering, Management, etc...'
            placeholder=''
          />
        </Grid>
        <Grid item md xs={12}>
          <HomeSearch
            // title='Where?'
            label='City, State or Pin Code'
            placeholder='Cities'
          />
        </Grid>
        <Grid item md xs={12}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.btoon}
            fullWidth
          >
            Find Jobs
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Home;
