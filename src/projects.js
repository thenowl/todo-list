let projectsContainer = {};

function initProjects() {
  addProject("_home");
  addProject("_today");
  addProject("_week");
  addProject("_month");
  addProject("Starter Project");
}

function allTodos() {
  for (const project of Object.keys(projectsContainer)) {
    if (
      project == "_home" ||
      project == "_today" ||
      project == "_week" ||
      project == "_month"
    ) {
      continue;
    }

    for (const todo of Object.entries(
      projectsContainer[project].projectItems
    )) {
      projectsContainer["_home"].projectItems[todo[1].title] = todo[1];
    }
  }
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function todaysTodos() {
  allTodos();
  for (const todo of Object.entries(projectsContainer["_home"].projectItems)) {
    if (todo[1].dueDate == new Date().toISOString().split("T")[0]) {
      projectsContainer["_today"].projectItems[todo[1].title] = todo[1];
    }
  }
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
    sortBy: "none",
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

function updateTodoList(project, updatedList, sortBy) {
  projectsContainer[project].projectItems = updatedList;
  projectsContainer[project].sortBy = sortBy;
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function getTodos(project) {
  return project.projectItems;
}

export {
  initProjects,
  allTodos,
  todaysTodos,
  getProjectsContainer,
  addProject,
  getProject,
  renameProject,
  deleteProject,
  createTodo,
  editTodo,
  addTodoToProject,
  deleteTodoFromProject,
  changeTodoStatus,
  updateTodoList,
  getTodos,
};
