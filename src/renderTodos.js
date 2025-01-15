import { createTodo } from "./todoObject";

// todos = {
//   title,
//   details,
//   dueDate,
//   priority,
//   todoStatus,
//   project,
// };

function renderCreateTodo() {
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

  const lowPriorityContainer = document.createElement("div");
  lowPriorityContainer.classList.add("low-priority-container");
  lowPriorityContainer.textContent = "Low";
  priorityButtonsContainer.appendChild(lowPriorityContainer);

  const mediumPriorityContainer = document.createElement("div");
  mediumPriorityContainer.classList.add("medium-priority-container");
  mediumPriorityContainer.textContent = "Medium";
  priorityButtonsContainer.appendChild(mediumPriorityContainer);

  const highPriorityContainer = document.createElement("div");
  highPriorityContainer.classList.add("high-priority-container");
  highPriorityContainer.textContent = "High";
  priorityButtonsContainer.appendChild(highPriorityContainer);

  return addTodoForm;
}

function renderTodo() {}

export { renderCreateTodo, renderTodo };
