import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import HomeSearch from "./HomeSearch";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
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
        <Grid item xs>
          <HomeSearch title='What?' />
        </Grid>
        <Grid item xs>
          <HomeSearch title='Where?' />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='secondary' fullWidth>
            Find Jobs
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Home;
