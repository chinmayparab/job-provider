import React, { useState } from "react";
import Work from "./sections/Work";
import WorkForm from "./formDialogs/WorkForm";

import Button from "@material-ui/core/Button";

const WorkDetails = ({ user, work_examples }) => {
  const [workFormOpen, setWorkFormOpen] = useState(false);

  return (
    <>
      {work_examples && <Work user={user} work_examples={work_examples} />}
      {!work_examples && (
        <Button color='secondary' onClick={() => setWorkFormOpen(true)}>
          Add Work Details
        </Button>
      )}
      <WorkForm workFormOpen={workFormOpen} setWorkFormOpen={setWorkFormOpen} />
    </>
  );
};

export default WorkDetails;
