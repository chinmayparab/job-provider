import React from "react";
import Typography from "@material-ui/core/Typography";

const EducationDetails = ({ project_list }) => {
  const {
    title,
    description,
    project_link,
    start_month,
    end_month,
  } = project_list;

  return (
    <>
      <Typography component='h6' variant='h6'>
        {title}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {description}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {project_link}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {start_month} To {end_month}
      </Typography>
    </>
  );
};

export default EducationDetails;
