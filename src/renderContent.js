import { renderCreateTodo, renderTodo } from "./renderTodos";
import { getProject } from "./projects";

function renderProjectContent(projName) {
  const content = document.querySelector("#content");
  content.innerText = "";

  const projectNameContainer = document.createElement("div");
  projectNameContainer.classList.add("project-name-container");
  content.appendChild(projectNameContainer);

  const projectName = document.createElement("h2");
  projectName.textContent = projName;
  projectNameContainer.appendChild(projectName);

  const addTodoContainer = document.createElement("div");
  addTodoContainer.classList.add("add-todo-container");
  content.appendChild(addTodoContainer);

  const addSign = document.createElement("span");
  addSign.classList.add("add-sign");
  addSign.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
  addTodoContainer.appendChild(addSign);

  const addText = document.createElement("p");
  addText.classList.add("add-text");
  addText.textContent = "Add Task";
  addTodoContainer.appendChild(addText);

  const createTodoContainer = document.createElement("div");
  createTodoContainer.classList.add("create-todo-container");
  content.appendChild(createTodoContainer);

  let createTodoIsOpen = false;

  addTodoContainer.addEventListener("click", () => {
    if (createTodoIsOpen) {
      createTodoContainer.textContent = "";
      createTodoIsOpen = false;
      return;
    }
    createTodoIsOpen = true;
    createTodoContainer.appendChild(renderCreateTodo());
  });

  const project = getProject(projName).projectItems;

  if (project) {
    for (const todo in project) {
      renderTodo(todo);
    }
  }
}

export { renderProjectContent };
