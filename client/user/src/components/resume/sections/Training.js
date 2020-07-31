import React from "react";
import Typography from "@material-ui/core/Typography";

const Training = ({ training }) => {
  const {
    program_name,
    organization_name,
    description,
    start_date,
    end_date,
  } = training;

  return (
    <>
      <Typography component='h6' variant='h6'>
        {program_name}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {organization_name}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {description}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {start_date} To {end_date}
      </Typography>
    </>
  );
};

export default Training;
