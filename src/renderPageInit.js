import { getProjectsContainer, allTodos } from "./projects";
import { renderProject } from "./renderProjects";
import { renderProjectContent } from "./renderContent";

// INITIALIZE PAGE:

function pageInit() {
  const projects = getProjectsContainer();

  for (const project in projects) {
    renderProject(project);
  }
  allTodos();
  renderProjectContent("_home");
}

export { pageInit };
