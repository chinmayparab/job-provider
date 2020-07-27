import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";
import { fetchCourses } from "./functions";

// const useStyles = makeStyles((theme) => ({}));

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses().then((res) => setCourses(res.allCourses));
  }, []);
  console.log(courses);

  return (
    <>
      <Grid container>
        <CourseCard />
      </Grid>
    </>
  );
};

export default Courses;
