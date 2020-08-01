import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "../courses/CourseCard";

const CourseCarousel = ({ recommendations }) => {
  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Container>
      <Typography
        style={{ marginTop: "10rem", textAlign: "center", fontWeight: "500" }}
        variant='h4'
        gutterBottom
      >
        Recommended Courses
      </Typography>
      <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
      <Slider {...slickSettings}>
        {recommendations &&
          recommendations.map((recommendation, index) => (
            <Box px={3} mb={5} mt={1}>
              <CourseCard course={recommendation} />
            </Box>
          ))}
      </Slider>
    </Container>
  );
};

export default CourseCarousel;
