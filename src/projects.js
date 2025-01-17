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

function getProject(projectName) {
  return projectsContainer[projectName];
}

function renameProject(oldTitle, newTitle) {
  if (oldTitle !== newTitle) {
    Object.defineProperty(
      projectsContainer,
      newTitle,
      Object.getOwnPropertyDescriptor(projectsContainer, oldTitle)
    );
    delete projectsContainer[oldTitle];
  }
  projectsContainer[newTitle].title = newTitle;
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function deleteProject(project) {
  delete projectsContainer[project];
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function createTodo(
  title,
  description,
  dueDate,
  priority,
  todoStatus = "todo",
  project
) {
  return { title, description, dueDate, priority, todoStatus, project };
}

function editTodo(oldTodoTitle, newTodoTitle, project, editedTodo) {
  let todo = projectsContainer[project].projectItems;
  if (oldTodoTitle !== newTodoTitle) {
    Object.defineProperty(
      todo,
      newTodoTitle,
      Object.getOwnPropertyDescriptor(todo, oldTodoTitle)
    );
    delete todo[oldTodoTitle];
  }
  todo[newTodoTitle] = editedTodo;
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function addTodoToProject(project, todoObject) {
  projectsContainer[project].projectItems[todoObject.title] = todoObject;
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function deleteTodoFromProject(project, todoObject) {
  delete projectsContainer[project].projectItems[todoObject];
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function changeTodoStatus(project, todo) {
  const currentStatus =
    projectsContainer[project].projectItems[todo].todoStatus;
  if (currentStatus == "todo") {
    projectsContainer[project].projectItems[todo].todoStatus = "done";
  } else {
    projectsContainer[project].projectItems[todo].todoStatus = "todo";
  }
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function getTodos(project) {
  return project.projectItems;
}

export {
  getProjectsContainer,
  initProjects,
  addProject,
  getProject,
  renameProject,
  deleteProject,
  createTodo,
  editTodo,
  addTodoToProject,
  deleteTodoFromProject,
  changeTodoStatus,
  getTodos,
};
