import { createTodo } from "./todoObject";

let projectsContainer = {};

function initProjects() {
  addProject("Starter Project");
}

function getProjectsContainer() {
  if (localStorage.length != 0 && Object.keys(projectsContainer).length == 0) {
    projectsContainer = JSON.parse(localStorage.getItem("projectsContainer"));
    return projectsContainer;
  } else {
    return projectsContainer;
  }
}

function addProject(title) {
  const newProject = {
    title: title,
    projectItems: {},
  };
  projectsContainer[title] = newProject;

  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function deleteProject(project) {
  delete projectsContainer[project];
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function addTodo(project, todoObject) {
  project[todoObject.title] = todoObject;
}

function deleteTodo(project, todoObject) {
  delete project[todoObject];
}

function getTodos(project) {
  return project.projectItems;
}

export {
  getProjectsContainer,
  initProjects,
  addProject,
  deleteProject,
  addTodo,
  deleteTodo,
  getTodos,
};
