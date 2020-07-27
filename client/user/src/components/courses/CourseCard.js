import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    margin: theme.spacing(2),
    width: "30%",
  },
}));

const CourseCard = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image='https://source.unsplash.com/random'
          title='Live from space album cover'
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h5' variant='h5'>
              Live From Space
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              Mac Miller
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
};
export default CourseCard;
