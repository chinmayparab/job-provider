import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { AuthContext } from "../../context/authContext/authContext";
import { CourseContext } from "../../context/courseContext/courseContext";
import { SnackContext } from "../../context/snackContext/snackContext";

import CourseDialog from "./CourseDialog";

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

  const { authToken } = useContext(AuthContext);
  const { deleteCourse, getAllCourses } = useContext(CourseContext);
  const { showSnack } = useContext(SnackContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDetailsOpen = () => {
    setDetailsOpen(true);
  };
  const handleDelete = () => {
    deleteCourse(authToken, course.course_id).then((res) => {
      if (res === true) {
        setDeleteOpen(false);
        showSnack("Course Deleted");
        getAllCourses();
      } else {
        setDeleteOpen(false);
        showSnack("Something went wrong");
      }
    });
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  return (
    <>
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
          {course.skills_taught}
        </Typography>

        <Grid className={classes.buttons} container spacing={2}>
          <Grid style={{ textAlign: "center" }} item xs={6}>
            <Button
              onClick={handleDetailsOpen}
              color='primary'
              variant='outlined'
            >
              View
            </Button>
          </Grid>
          <Grid style={{ textAlign: "center" }} item xs={6}>
            <Button
              onClick={handleDeleteOpen}
              color='secondary'
              variant='outlined'
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <CourseDialog
        detailsOpen={detailsOpen}
        setDetailsOpen={setDetailsOpen}
        course={course}
      />
      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Job?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be reverted. Are you sure you want to delete
            course <span style={{ fontWeight: "700" }}>{course.title}</span> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color='secondary'>
            Delete Job
          </Button>
          <Button onClick={handleDeleteClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseCard;
