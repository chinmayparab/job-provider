import React, { useState } from "react";
import Education from "./sections/Education";
import EducationForm from "./formDialogs/EducationForm";

import Button from "@material-ui/core/Button";

const EducationDetails = ({ user, edu_details }) => {
  const [educationFormOpen, setEducationFormOpen] = useState(false);

  return (
    <>
      {edu_details &&
        edu_details.map((edu_detail) => (
          <Education user={user} edu_detail={edu_detail} />
        ))}
      <Button color='secondary' onClick={() => setEducationFormOpen(true)}>
        Add Educational Details
      </Button>
      <EducationForm
        educationFormOpen={educationFormOpen}
        setEducationFormOpen={setEducationFormOpen}
      />
    </>
  );
};

export default EducationDetails;
