import React, { useState } from "react";
import Training from "./sections/Training";
import TrainingForm from "./formDialogs/TrainingForm";

import Button from "@material-ui/core/Button";

const TrainingDetails = ({ user, trainings_list }) => {
  const [trainingFormOpen, setTrainingFormOpen] = useState(false);

  return (
    <>
      {trainings_list &&
        trainings_list.map((training) => (
          <Training user={user} training={training} />
        ))}
      <Button color='secondary' onClick={() => setTrainingFormOpen(true)}>
        Add Training Details
      </Button>
      <TrainingForm
        trainingFormOpen={trainingFormOpen}
        setTrainingFormOpen={setTrainingFormOpen}
      />
    </>
  );
};

export default TrainingDetails;
