import { getProjectsContainer } from "./projects";
import { renderProject } from "./renderProjects";

// INITIALIZE PAGE:

function pageInit() {
  const projects = getProjectsContainer();

  for (const project in projects) {
    renderProject(project);
  }
}

export { pageInit };
