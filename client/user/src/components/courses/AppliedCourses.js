import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { fetchCourses, fetchAppliedCourses } from "./functions";

const AppliedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const localAuthToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchAppliedCourses(localAuthToken).then((res) =>
      setCourses(res.enrolledcourses)
    );
    fetchCourses().then((res) => setAllCourses(res));
  }, []);

  let appliedCourses = [];
  if (allCourses.length && courses) {
    courses.map((course) => {
      allCourses.map((allCourse) => {
        if (course.course_id === allCourse.course_id) {
          appliedCourses.push({
            category: allCourse.category,
            title: allCourse.title,
            price: allCourse.price,
            description: allCourse.description,
            skills_taught: allCourse.skills_taught,
            level: allCourse.level,
          });
        }
      });
    });
  }

  return (
    <Container>
      <Container>
        <Typography gutterBottom={true} variant='h5'>
          View Enrolled Courses
        </Typography>
        <Grid container spacing={3}>
          {appliedCourses.length > 0 ? (
            appliedCourses.map((course, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <CourseCard
                  course={course}
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

export default AppliedCourses;
