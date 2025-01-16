import { format } from "date-fns";
import {
  getProject,
  createTodo,
  addTodoToProject,
  changeTodoStatus,
} from "./projects";

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
    createTodoContainer.appendChild(renderCreateTodo(projName));
  });

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");
  content.appendChild(contentContainer);

  const projectTodos = getProject(projName).projectItems;

  if (projectTodos) {
    for (const [todoTitle, todoObject] of Object.entries(projectTodos)) {
      contentContainer.appendChild(renderTodo(projName, todoObject));
    }
  }
}

function renderCreateTodo(projName) {
  const addTodoForm = document.createElement("form");
  addTodoForm.classList.add("add-todo-form");

  const titleInputContainer = document.createElement("div");
  titleInputContainer.classList.add("title-input-container");
  addTodoForm.appendChild(titleInputContainer);

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "todoTitle");
  titleLabel.classList.add("title-label");
  titleLabel.textContent = "Title:";
  titleInputContainer.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "todoTitle";
  titleInput.name = "todoTitle";
  titleInput.placeholder = "Laundry, pay bills, etc...";
  titleInputContainer.appendChild(titleInput);

  const descriptionInputContainer = document.createElement("div");
  descriptionInputContainer.classList.add("description-input-container");
  addTodoForm.appendChild(descriptionInputContainer);

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "todoDescription");
  descriptionLabel.classList.add("description-label");
  descriptionLabel.textContent = "Description:";
  descriptionInputContainer.appendChild(descriptionLabel);

  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.id = "todoDescription";
  descriptionTextarea.name = "todoDescription";
  descriptionTextarea.placeholder = "e.g. wash towels, pay rent, etc...";
  descriptionInputContainer.appendChild(descriptionTextarea);

  const dueDateContainer = document.createElement("div");
  dueDateContainer.classList.add("due-date-container");
  addTodoForm.appendChild(dueDateContainer);

  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.classList.add("due-date-label");
  dueDateLabel.textContent = "Due date:";
  dueDateContainer.appendChild(dueDateLabel);

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "dueDate";
  dueDateInput.name = "dueDate";
  dueDateInput.valueAsDate = new Date();
  dueDateInput.min = new Date();
  dueDateContainer.appendChild(dueDateInput);

  const priorityContainer = document.createElement("div");
  priorityContainer.classList.add("priority-container");
  addTodoForm.appendChild(priorityContainer);

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.classList.add("priority-label");
  priorityLabel.textContent = "Priority:";
  priorityContainer.appendChild(priorityLabel);

  const priorityButtonsContainer = document.createElement("div");
  priorityButtonsContainer.classList.add("priority-buttons-container");
  priorityButtonsContainer.id = "priority";
  priorityContainer.appendChild(priorityButtonsContainer);

  const lowPriorityButton = document.createElement("div");
  lowPriorityButton.classList.add("low-priority-button");
  lowPriorityButton.setAttribute("data-value", 1);
  lowPriorityButton.id = "p1";
  lowPriorityButton.textContent = "Low";
  priorityButtonsContainer.appendChild(lowPriorityButton);

  const mediumPriorityButton = document.createElement("div");
  mediumPriorityButton.classList.add("medium-priority-button");
  mediumPriorityButton.setAttribute("data-value", 2);
  mediumPriorityButton.id = "p2";
  mediumPriorityButton.textContent = "Medium";
  priorityButtonsContainer.appendChild(mediumPriorityButton);

  const highPriorityButton = document.createElement("div");
  highPriorityButton.classList.add("high-priority-button");
  highPriorityButton.setAttribute("data-value", 3);
  highPriorityButton.id = "p3";
  highPriorityButton.textContent = "High";
  priorityButtonsContainer.appendChild(highPriorityButton);

  const addTodoButtonContainer = document.createElement("div");
  addTodoButtonContainer.classList.add("add-todo-button-container");
  addTodoForm.appendChild(addTodoButtonContainer);

  const addTodoButton = document.createElement("button");
  addTodoButton.classList.add("add-todo-button");
  addTodoButton.type = "button";
  addTodoButton.innerText = "Add Todo";
  addTodoButtonContainer.appendChild(addTodoButton);

  let isLowPrioritySelected = false;
  let isMediumPrioritySelected = false;
  let isHighPrioritySelected = false;
  let selectedPriority = 0;

  priorityButtonsContainer.addEventListener("click", (e) => {
    let prioritySelection = e.target.id;

    if (prioritySelection == "p1") {
      isLowPrioritySelected = true;
      isMediumPrioritySelected = false;
      isHighPrioritySelected = false;
      selectedPriority = 1;
      lowPriorityButton.classList.add("selected");
      mediumPriorityButton.classList.remove("selected");
      highPriorityButton.classList.remove("selected");
    } else if (prioritySelection == "p2") {
      isLowPrioritySelected = false;
      isMediumPrioritySelected = true;
      isHighPrioritySelected = false;
      selectedPriority = 2;
      lowPriorityButton.classList.remove("selected");
      mediumPriorityButton.classList.add("selected");
      highPriorityButton.classList.remove("selected");
    } else if (prioritySelection == "p3") {
      isLowPrioritySelected = false;
      isMediumPrioritySelected = false;
      isHighPrioritySelected = true;
      selectedPriority = 3;
      lowPriorityButton.classList.remove("selected");
      mediumPriorityButton.classList.remove("selected");
      highPriorityButton.classList.add("selected");
    }
  });

  function addTodo() {
    if (!titleInput.value) {
      const titleRequestContainer = document.createElement("dialog");
      titleRequestContainer.classList.add("title-request-container");
      addTodoForm.appendChild(titleRequestContainer);
      titleRequestContainer.showModal();

      const warning = document.createElement("h2");
      warning.classList.add("warning-message");
      warning.innerText = "Please enter a title for your task";
      titleRequestContainer.appendChild(warning);

      const titleRequestButtonContainer = document.createElement("div");
      titleRequestButtonContainer.classList.add(
        "title-request-button-container"
      );
      titleRequestContainer.appendChild(titleRequestButtonContainer);

      const titleRequestButton = document.createElement("button");
      titleRequestButton.classList.add("ok-button");
      titleRequestButton.type = "button";
      titleRequestButton.innerText = "OK";
      titleRequestButtonContainer.appendChild(titleRequestButton);

      titleRequestButton.addEventListener("click", () => {
        titleRequestContainer.close();
      });
      return;
    }

    const newTodo = createTodo(
      titleInput.value,
      descriptionTextarea.value,
      dueDateInput.value,
      selectedPriority,
      "todo",
      projName
    );
    addTodoToProject(projName, newTodo);
    renderProjectContent(projName);
  }

  addTodoButton.addEventListener("click", addTodo);

  return addTodoForm;
}

function renderTodo(projectName, todo) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  todoContainer.appendChild(statusContainer);

  const statusCheckBox = document.createElement("input");
  statusCheckBox.type = "checkbox";
  statusCheckBox.classList.add("status-check-box");
  statusContainer.appendChild(statusCheckBox);

  todo.todoStatus == "todo"
    ? (statusCheckBox.checked = false)
    : (statusCheckBox.checked = true);

  statusCheckBox.addEventListener("click", () => {
    changeTodoStatus(projectName, todo.title);
  });

  const titleDescriptionContainer = document.createElement("div");
  titleDescriptionContainer.classList.add("title-description-container");
  todoContainer.appendChild(titleDescriptionContainer);

  const todoTitle = document.createElement("h3");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;
  titleDescriptionContainer.appendChild(todoTitle);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");
  titleDescriptionContainer.appendChild(descriptionContainer);

  const description = document.createElement("p");
  description.classList.add("description-text");
  description.innerText = todo.description;
  descriptionContainer.appendChild(description);

  const dueDate = document.createElement("p");
  dueDate.textContent = `Due date: ${format(todo.dueDate, "P")}`;
  todoContainer.appendChild(dueDate);

  const priority = document.createElement("div");
  priority.classList.add("selected");

  if (todo.priority == 1) {
    priority.classList.add("low-priority-button");
    priority.textContent = "Low";
  } else if (todo.priority == 2) {
    priority.classList.add("medium-priority-button");
    priority.textContent = "Medium";
  } else if (todo.priority == 3) {
    priority.classList.add("high-priority-button");
    priority.textContent = "High";
  }

  todoContainer.appendChild(priority);

  return todoContainer;
}

export { renderProjectContent };
