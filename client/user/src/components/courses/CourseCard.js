import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    height: "100%",
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const CourseCard = ({ title, price, category, description, skills, level }) => {
  const classes = useStyles();
  const enrolJob = () => {
    console.log("easy");
  };
  return (
    <Paper className={classes.card}>
      <Typography noWrap noWrap variant='h6'>
        {title}
      </Typography>
      <Typography noWrap noWrap gutterBottom variant='subtitle2'>
        {level}
      </Typography>
      <Typography noWrap gutterBottom noWrap variant='subtitle2'>
        Rs. {price}
      </Typography>
      <Chip label={category} />
      <Box my={1}>
        <Typography noWrap variant='subtitle2'>
          Description
        </Typography>
        <Typography noWrap variant='subtitle1'>
          {description}
        </Typography>
      </Box>
      <Typography noWrap variant='subtitle2'>
        Skills taught
      </Typography>
      <Typography noWrap variant='subtitle1'>
        {skills}
      </Typography>

      <Grid className={classes.buttons} container spacing={2}>
        <Button onClick={enrolJob} color='secondary'>
          Enrol
        </Button>
      </Grid>
    </Paper>
  );
};
export default CourseCard;
