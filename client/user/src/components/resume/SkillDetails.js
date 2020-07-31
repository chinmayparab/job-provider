import React, { useState } from "react";
import Skill from "./sections/Skill";
import SkillForm from "./formDialogs/SkillForm";

import Button from "@material-ui/core/Button";

const SkillDetails = ({ user, skills_list }) => {
  const [skillFormOpen, setSkillFormOpen] = useState(false);

  return (
    <>
      {skills_list &&
        skills_list.map((skill) => <Skill user={user} skill={skill} />)}
      <Button color='secondary' onClick={() => setSkillFormOpen(true)}>
        Add Skillal Details
      </Button>
      <SkillForm
        skillFormOpen={skillFormOpen}
        setSkillFormOpen={setSkillFormOpen}
      />
    </>
  );
};

export default SkillDetails;
