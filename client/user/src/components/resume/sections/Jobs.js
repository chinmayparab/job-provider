import React from "react";
import Typography from "@material-ui/core/Typography";

const EducationDetails = ({ job_detail }) => {
  const {
    job_title,
    organiztion,
    job_location,
    start_year,
    end_date,
  } = job_detail;

  return (
    <>
      <Typography component='h6' variant='h6'>
        {job_title}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {organiztion}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {start_year} To {end_date}
      </Typography>
    </>
  );
};

export default EducationDetails;
