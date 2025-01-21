import {
  startOfWeek,
  endOfWeek,
  formatISO,
  startOfMonth,
  endOfMonth,
} from "date-fns";

let projectsContainer = {};

function initProjects() {
  addProject("_home");
  addProject("_today");
  addProject("_week");
  addProject("_month");
  addProject("Starter Project");
  addTodoToProject(
    "Starter Project",
    createTodo(
      "Example Todo",
      "Click me to reveal the rest of my content.\nAs you can see, you can unfold Todos to show longer descriptions.",
      new Date().toISOString().split("T")[0],
      2,
      "todo",
      "Starter Project"
    )
  );
}

function allTodos() {
  projectsContainer["_home"].projectItems = {};
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
  projectsContainer["_today"].projectItems = {};
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
      if (todo[1].dueDate == new Date().toISOString().split("T")[0]) {
        projectsContainer["_today"].projectItems[todo[1].title] = todo[1];
      }
    }
  }
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function thisWeeksTodos() {
  projectsContainer["_week"].projectItems = {};
  for (const project of Object.keys(projectsContainer)) {
    if (
      project == "_home" ||
      project == "_today" ||
      project == "_week" ||
      project == "_month"
    ) {
      continue;
    }

    const today = new Date();
    const firstDayOfWeek = formatISO(startOfWeek(today, { weekStartsOn: 1 }), {
      representation: "date",
    });
    const lastDayOfWeek = formatISO(endOfWeek(today, { weekStartsOn: 1 }), {
      representation: "date",
    });
    for (const todo of Object.entries(
      projectsContainer[project].projectItems
    )) {
      if (
        todo[1].dueDate >= firstDayOfWeek &&
        todo[1].dueDate <= lastDayOfWeek
      ) {
        projectsContainer["_week"].projectItems[todo[1].title] = todo[1];
      }
    }
  }
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
}

function thisMonthsTodos() {
  console.log("yay");
  projectsContainer["_month"].projectItems = {};
  for (const project of Object.keys(projectsContainer)) {
    if (
      project == "_home" ||
      project == "_today" ||
      project == "_week" ||
      project == "_month"
    ) {
      continue;
    }

    const today = new Date();
    const firstDayOfMonth = formatISO(startOfMonth(today), {
      representation: "date",
    });
    const lastDayOfMonth = formatISO(endOfMonth(today), {
      representation: "date",
    });
    for (const todo of Object.entries(
      projectsContainer[project].projectItems
    )) {
      if (
        todo[1].dueDate >= firstDayOfMonth &&
        todo[1].dueDate <= lastDayOfMonth
      ) {
        projectsContainer["_month"].projectItems[todo[1].title] = todo[1];
      }
    }
  }
  localStorage.setItem("projectsContainer", JSON.stringify(projectsContainer));
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

function editTodo(
  oldTodoTitle,
  newTodoTitle,
  oldProject,
  newProject,
  editedTodo
) {
  let todo = projectsContainer[oldProject].projectItems;
  if (oldTodoTitle !== newTodoTitle) {
    Object.defineProperty(
      todo,
      newTodoTitle,
      Object.getOwnPropertyDescriptor(todo, oldTodoTitle)
    );
    delete todo[oldTodoTitle];
  }
  if (oldProject == newProject) {
    todo[newTodoTitle] = editedTodo;
  } else {
    delete todo[oldTodoTitle];
    projectsContainer[newProject].projectItems[newTodoTitle] = editedTodo;
  }
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
  thisWeeksTodos,
  thisMonthsTodos,
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
