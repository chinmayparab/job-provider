import React, { useState } from "react";
import Jobs from "./sections/Jobs";
import JobsForm from "./formDialogs/JobsForm";

import Button from "@material-ui/core/Button";

const JobsDetails = ({ user, job_details }) => {
  const [jobsFormOpen, setJobsFormOpen] = useState(false);

  return (
    <>
      {job_details &&
        job_details.map((job_detail) => (
          <Jobs user={user} job_detail={job_detail} />
        ))}
      <Button color='secondary' onClick={() => setJobsFormOpen(true)}>
        Add Job Details
      </Button>
      <JobsForm jobsFormOpen={jobsFormOpen} setJobsFormOpen={setJobsFormOpen} />
    </>
  );
};

export default JobsDetails;
