import React from "react";
import Typography from "@material-ui/core/Typography";

const Education = ({ edu_detail }) => {
  const { degree, college, start_year, end_date } = edu_detail;

  return (
    <>
      <Typography component='h6' variant='h6'>
        {degree}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {college}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {start_year} To {end_date}
      </Typography>
    </>
  );
};

export default Education;
