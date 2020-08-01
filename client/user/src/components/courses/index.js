import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { fetchCourses } from "./functions";

// const useStyles = makeStyles((theme) => ({}));

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses().then((res) => setCourses(res));
  }, []);

  return (
    <Container>
      <Container>
        <Typography gutterBottom={true} variant='h5'>
          View Courses
        </Typography>
        <Grid container spacing={3}>
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <CourseCard
                  course_id={course.course_id}
                  category={course.category}
                  title={course.title}
                  price={course.price}
                  description={course.description}
                  skills={course.skills_taught}
                  level={course.level}
                />
              </Grid>
            ))
          ) : (
            <span />
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default Courses;
