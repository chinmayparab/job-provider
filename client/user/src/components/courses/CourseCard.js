import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { enrolCourses } from "./functions";
import { AlertContext } from "../../context/alert/AlertContext";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    height: "100%",
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const CourseCard = ({ course }) => {
  const classes = useStyles();
  const localAuthToken = localStorage.getItem("authToken");
  const { showAlert } = useContext(AlertContext);

  const enrol = () => {
    enrolCourses(course.course_id, localAuthToken).then((res) => {
      if (res) {
        showAlert("Successfully Enrolled");
      } else {
        showAlert("Something went wrong. Try again");
      }
    });
  };

  return (
    <Paper className={classes.card}>
      <Typography noWrap noWrap variant='h6'>
        {course.title}
      </Typography>
      <Typography noWrap noWrap gutterBottom variant='subtitle2'>
        {course.level}
      </Typography>
      <Typography noWrap gutterBottom noWrap variant='subtitle2'>
        Rs. {course.price}
      </Typography>
      <Chip label={course.category} />
      <Box my={1}>
        <Typography noWrap variant='subtitle2'>
          Description
        </Typography>
        <Typography noWrap variant='subtitle1'>
          {course.description}
        </Typography>
      </Box>
      <Typography noWrap variant='subtitle2'>
        Skills taught
      </Typography>
      <Typography noWrap variant='subtitle1'>
        {course.skills}
      </Typography>
      {course.course_id && (
        <Grid className={classes.buttons} container spacing={2}>
          <Button onClick={enrol} color='secondary'>
            Enrol
          </Button>
        </Grid>
      )}
    </Paper>
  );
};
export default CourseCard;
