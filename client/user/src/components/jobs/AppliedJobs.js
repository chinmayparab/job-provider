import React, { useEffect, useContext } from "react";
import APJobCards from "./APJobCards";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { JobsContext } from "../../context/jobs/JobsContext";

const AppliedJobs = () => {
  const { jobs, appliedJobs, fetchJobs, fetchAppliedJobs } = useContext(
    JobsContext
  );

  const localAuthToken = localStorage.getItem("authToken");
  const appliedJobbs = [];

  useEffect(() => {
    fetchAppliedJobs(localAuthToken);
    fetchJobs();
  }, []);

  if (jobs && appliedJobs) {
    appliedJobs.map((job) => {
      jobs.map((allJob) => {
        if (job.job_id === allJob.job_id) {
          appliedJobbs.push({
            pos_names: allJob.pos_names,
            stipend: allJob.stipend,
            qualification: allJob.qualification,
            no_postions: allJob.no_postions,
            interview_mode: allJob.interview_mode,
            interveiw_loc: allJob.interveiw_loc,
          });
        }
      });
    });
  }

  return (
    <Container>
      <Container>
        <Typography gutterBottom={true} variant='h5'>
          View Applied Jobs
        </Typography>
        <Grid container spacing={3}>
          {appliedJobbs.length > 0 ? (
            appliedJobbs.map((job, index) => (
              <Grid key={index} item xs={12}>
                <APJobCards job={job} />
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

export default AppliedJobs;
