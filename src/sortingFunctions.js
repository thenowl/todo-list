import { updateTodoList } from "./projects";

function sortByAlphabet(obj) {
  let projectTodos = obj.projectItems;
  const sorted = {};

  Object.keys(projectTodos)
    .sort((a, b) => {
      return projectTodos[a].title.localeCompare(projectTodos[b].title);
    })
    .forEach((key) => {
      sorted[key] = projectTodos[key];
    });

  updateTodoList(obj.title, sorted, "alphabet");
}

function sortByPriority(obj) {
  let projectTodos = obj.projectItems;
  const sorted = {};

  Object.keys(projectTodos)
    .sort((a, b) => {
      if (projectTodos[b].priority !== projectTodos[a].priority) {
        return projectTodos[b].priority - projectTodos[a].priority;
      } else {
        return (
          new Date(projectTodos[a].dueDate) - new Date(projectTodos[b].dueDate)
        );
      }
    })
    .forEach((key) => {
      sorted[key] = projectTodos[key];
    });

  updateTodoList(obj.title, sorted, "priority");
}

function sortByDueDate(obj) {
  let projectTodos = obj.projectItems;
  const sorted = {};

  Object.keys(projectTodos)
    .sort((a, b) => {
      if (
        new Date(projectTodos[a].dueDate) !== new Date(projectTodos[b].dueDate)
      ) {
        return (
          new Date(projectTodos[a].dueDate) - new Date(projectTodos[b].dueDate)
        );
      } else {
        return projectTodos[b].priority - projectTodos[a].priority;
      }
    })
    .forEach((key) => {
      sorted[key] = projectTodos[key];
    });

  updateTodoList(obj.title, sorted, "dueDate");
}

export { sortByAlphabet, sortByPriority, sortByDueDate };
