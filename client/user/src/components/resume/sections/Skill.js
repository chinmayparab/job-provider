import React from "react";
import Typography from "@material-ui/core/Typography";

const EducationDetails = ({ skill }) => {
  const { skill_id, level } = skill;

  return (
    <>
      <Typography component='h6' variant='h6'>
        {skill_id}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {level}
      </Typography>
    </>
  );
};

export default EducationDetails;
