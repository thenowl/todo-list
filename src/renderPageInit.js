import { getProjectsContainer } from "./projects";
import { renderAddProject } from "./renderProjects";

// INITIALIZE PAGE:

function pageInit() {
  const projects = getProjectsContainer();

  for (const project in projects) {
    renderAddProject(project);
  }
}

export { pageInit };
