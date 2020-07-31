import React, { useState } from "react";
import Project from "./sections/Project";
import ProjectForm from "./formDialogs/ProjectForm";

import Button from "@material-ui/core/Button";

const ProjectDetails = ({ user, projects_list }) => {
  const [projectsFormOpen, setProjectFormOpen] = useState(false);

  return (
    <>
      {projects_list &&
        projects_list.map((project_list) => (
          <Project user={user} project_list={project_list} />
        ))}
      <Button color='secondary' onClick={() => setProjectFormOpen(true)}>
        Add Project Details
      </Button>
      <ProjectForm
        projectsFormOpen={projectsFormOpen}
        setProjectFormOpen={setProjectFormOpen}
      />
    </>
  );
};

export default ProjectDetails;
