import React from "react";
import Typography from "@material-ui/core/Typography";

const Work = ({ work_examples }) => {
  const { blog_url, github, portfolio } = work_examples;

  return (
    <>
      <Typography component='h6' variant='h6'>
        {blog_url}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {github}
      </Typography>
      <Typography component='h6' variant='subtitle1'>
        {portfolio}
      </Typography>
    </>
  );
};

export default Work;
