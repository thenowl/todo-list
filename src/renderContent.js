import { format } from "date-fns";
import {
  allTodos,
  todaysTodos,
  thisWeeksTodos,
  thisMonthsTodos,
  getProjectsContainer,
  getProject,
  createTodo,
  editTodo,
  addTodoToProject,
  changeTodoStatus,
  deleteTodoFromProject,
} from "./projects";
import {
  sortByAlphabet,
  sortByPriority,
  sortByDueDate,
} from "./sortingFunctions";
import { toCamelCase } from "./utilities";

let createTodoIsOpen = false;

// CONTENT RENDERER TO CALL ALL THE FUNCTIONS:

function renderProjectContent(projName) {
  const content = document.querySelector("#content");
  content.innerText = "";

  const projectNameContainer = document.createElement("div");
  projectNameContainer.classList.add("project-name-container");
  content.appendChild(projectNameContainer);

  const projectName = document.createElement("h2");
  projectName.textContent = projName;
  projectNameContainer.appendChild(projectName);

  const sortContainer = document.createElement("div");
  sortContainer.classList.add("sort-container");
  projectNameContainer.appendChild(sortContainer);

  const sortInstruction = document.createElement("h3");
  sortInstruction.classList.add("sort-instruction");
  sortInstruction.innerText = "Sort by:";
  sortContainer.appendChild(sortInstruction);

  const sortByName = document.createElement("h3");
  sortByName.classList.add("sort-by-name");
  sortByName.innerText = "Name";
  sortContainer.appendChild(sortByName);

  const sortByPrio = document.createElement("h3");
  sortByPrio.classList.add("sort-by-priority");
  sortByPrio.innerText = "Priority";
  sortContainer.appendChild(sortByPrio);

  const sortByDate = document.createElement("h3");
  sortByDate.classList.add("sort-by-date");
  sortByDate.innerText = "Date";
  sortContainer.appendChild(sortByDate);

  if (getProject(projName).sortBy == "alphabet") {
    sortByName.classList.add("selected-sort");
  }
  if (getProject(projName).sortBy == "priority") {
    sortByPrio.classList.add("selected-sort");
  }
  if (getProject(projName).sortBy == "dueDate") {
    sortByDate.classList.add("selected-sort");
  }

  sortByName.addEventListener("click", () => {
    const thisProject = getProject(projName);
    sortByAlphabet(thisProject);
    renderProjectContent(projName);
  });

  sortByPrio.addEventListener("click", () => {
    const thisProject = getProject(projName);
    sortByPriority(thisProject);
    renderProjectContent(projName);
  });

  sortByDate.addEventListener("click", () => {
    const thisProject = getProject(projName);
    sortByDueDate(thisProject);
    renderProjectContent(projName);
  });

  const addTodoContainer = document.createElement("div");
  addTodoContainer.classList.add("add-todo-container");
  content.appendChild(addTodoContainer);

  const addSign = document.createElement("span");
  addSign.classList.add("add-sign");
  addSign.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
  addTodoContainer.appendChild(addSign);

  const addText = document.createElement("p");
  addText.classList.add("add-text");
  addText.textContent = "Add Todo";
  addTodoContainer.appendChild(addText);

  const createTodoContainer = document.createElement("div");
  createTodoContainer.classList.add("create-todo-container");
  content.appendChild(createTodoContainer);

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

// CREATE TODO FORM:

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

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("add-todo-project-container");
  addTodoForm.appendChild(projectContainer);

  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "addTodoProjectSelector");
  projectLabel.classList.add("project-label");
  projectLabel.textContent = "Project:";
  projectContainer.appendChild(projectLabel);

  const projectSelection = document.createElement("select");
  projectSelection.name = "project";
  projectSelection.id = "addTodoProjectSelector";
  projectContainer.appendChild(projectSelection);

  for (const project of Object.keys(getProjectsContainer())) {
    if (
      project == "_home" ||
      project == "_today" ||
      project == "_week" ||
      project == "_month"
    ) {
      continue;
    }
    const projectId = toCamelCase(project);
    const projectOption = document.createElement("option");
    projectOption.id = projectId;
    projectOption.value = project;
    projectOption.innerText = project;
    projectSelection.appendChild(projectOption);

    if (projName == project) {
      projectOption.selected = true;
    }
  }

  if (
    projName == "_home" ||
    projName == "_today" ||
    projName == "_week" ||
    projName == "_month"
  ) {
    projectSelection.disabled = false;
  } else {
    projectSelection.disabled = true;
  }

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
      warning.innerText = "Please enter a title for your todo";
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

    console.log(projectSelection.value);
    const newTodo = createTodo(
      titleInput.value,
      descriptionTextarea.value,
      dueDateInput.value,
      selectedPriority,
      "todo",
      projectSelection.value
    );
    addTodoToProject(projectSelection.value, newTodo);
    if (projName == "_home") allTodos();
    if (projName == "_today") todaysTodos();
    if (projName == "_week") thisWeeksTodos();
    if (projName == "_month") thisMonthsTodos();
    renderProjectContent(projName);
    createTodoIsOpen = false;
  }

  addTodoButton.addEventListener("click", addTodo);

  return addTodoForm;
}

// RENDER ALL TODOS:

function renderTodo(projectName, todo) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const todoContentContainer = document.createElement("div");
  todoContentContainer.classList.add("todo-content-container");
  todoContainer.appendChild(todoContentContainer);

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  todoContentContainer.appendChild(statusContainer);

  const statusCheckBox = document.createElement("input");
  statusCheckBox.type = "checkbox";
  statusCheckBox.classList.add("status-check-box");
  statusContainer.appendChild(statusCheckBox);

  const titleDescriptionContainer = document.createElement("div");
  titleDescriptionContainer.classList.add("title-description-container");
  todoContentContainer.appendChild(titleDescriptionContainer);

  const todoTitle = document.createElement("h3");
  todoTitle.classList.add("todo-title");
  todoTitle.textContent = todo.title;
  titleDescriptionContainer.appendChild(todoTitle);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");
  titleDescriptionContainer.appendChild(descriptionContainer);

  const description = document.createElement("p");
  description.classList.add("description-text");
  description.classList.add("description-is-closed");
  description.innerText = todo.description;
  descriptionContainer.appendChild(description);

  let todoIsOpen = false;
  let editTodoIsOpen = false;

  titleDescriptionContainer.addEventListener("click", () => {
    if (editTodoIsOpen) return;
    if (todoIsOpen) {
      todoContainer.style.height = "4rem";
      description.classList.add("description-is-closed");
      todoIsOpen = false;
    } else {
      todoContainer.style.height = "fit-content";
      description.classList.remove("description-is-closed");
      todoIsOpen = true;
    }
  });

  const todoProjectContainer = document.createElement("div");
  todoProjectContainer.classList.add("todo-project-container");
  todoContentContainer.appendChild(todoProjectContainer);

  if (
    projectName == "_home" ||
    projectName == "_today" ||
    projectName == "_week" ||
    projectName == "_month"
  ) {
    const projectDescriptor = document.createElement("p");
    projectDescriptor.innerText = "Project:";
    todoProjectContainer.appendChild(projectDescriptor);

    const projectName = document.createElement("p");
    projectName.innerText = todo.project;
    todoProjectContainer.appendChild(projectName);
  }

  const rightSideTodoContainer = document.createElement("div");
  rightSideTodoContainer.classList.add("right-side-todo-container");
  todoContentContainer.appendChild(rightSideTodoContainer);

  const dueDate = document.createElement("p");
  dueDate.classList.add("due-date");
  dueDate.textContent = `Due date: ${format(todo.dueDate, "P")}`;
  rightSideTodoContainer.appendChild(dueDate);

  const priority = document.createElement("div");
  priority.classList.add("selected");
  priority.classList.add("priority");
  rightSideTodoContainer.appendChild(priority);

  if (todo.priority == 0) {
    priority.classList.add("no-priority-button");
  } else if (todo.priority == 1) {
    priority.classList.add("low-priority-button");
    priority.textContent = "Low";
  } else if (todo.priority == 2) {
    priority.classList.add("medium-priority-button");
    priority.textContent = "Medium";
  } else if (todo.priority == 3) {
    priority.classList.add("high-priority-button");
    priority.textContent = "High";
  }

  if (todo.todoStatus == "todo") {
    statusCheckBox.checked = false;
    todoContentContainer.classList.remove("done");
    priority.classList.add("selected");
  } else {
    statusCheckBox.checked = true;
    todoContentContainer.classList.add("done");
    priority.classList.remove("selected");
  }

  statusCheckBox.addEventListener("click", () => {
    changeTodoStatus(todo.project, todo.title);
    renderProjectContent(projectName);
  });

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("todo-options-container");
  rightSideTodoContainer.appendChild(optionsContainer);

  const editTodoSymbol = document.createElement("span");
  editTodoSymbol.classList.add("edit-todo-symbol");
  editTodoSymbol.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  optionsContainer.appendChild(editTodoSymbol);

  const deleteTodoSymbol = document.createElement("span");
  deleteTodoSymbol.classList.add("delete-todo-symbol");
  deleteTodoSymbol.innerHTML = '<i class="fa-solid fa-trash"></i>';
  optionsContainer.appendChild(deleteTodoSymbol);

  const editTodoFormContainer = document.createElement("div");
  editTodoFormContainer.classList.add("edit-todo-form-container");
  todoContainer.appendChild(editTodoFormContainer);

  // EDIT TODO:

  function editTodoForm() {
    const editTodoForm = document.createElement("form");
    editTodoForm.classList.add("edit-todo-form");
    editTodoFormContainer.appendChild(editTodoForm);

    const titleInputContainer = document.createElement("div");
    titleInputContainer.classList.add("title-input-container");
    editTodoForm.appendChild(titleInputContainer);

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "todoTitle");
    titleLabel.classList.add("title-label");
    titleLabel.textContent = "Title:";
    titleInputContainer.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "todoTitle";
    titleInput.name = "todoTitle";
    titleInput.value = todo.title;
    titleInputContainer.appendChild(titleInput);

    const descriptionInputContainer = document.createElement("div");
    descriptionInputContainer.classList.add("description-input-container");
    editTodoForm.appendChild(descriptionInputContainer);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "todoDescription");
    descriptionLabel.classList.add("description-label");
    descriptionLabel.textContent = "Description:";
    descriptionInputContainer.appendChild(descriptionLabel);

    const descriptionTextarea = document.createElement("textarea");
    descriptionTextarea.id = "todoDescription";
    descriptionTextarea.name = "todoDescription";
    descriptionTextarea.value = todo.description;
    descriptionInputContainer.appendChild(descriptionTextarea);

    const dueDateContainer = document.createElement("div");
    dueDateContainer.classList.add("due-date-container");
    editTodoForm.appendChild(dueDateContainer);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateLabel.classList.add("due-date-label");
    dueDateLabel.textContent = "Due date:";
    dueDateContainer.appendChild(dueDateLabel);

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.id = "dueDate";
    dueDateInput.name = "dueDate";
    dueDateInput.value = todo.dueDate;
    dueDateInput.min = new Date();
    dueDateContainer.appendChild(dueDateInput);

    const priorityContainer = document.createElement("div");
    priorityContainer.classList.add("priority-container");
    editTodoForm.appendChild(priorityContainer);

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

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("add-todo-project-container");
    editTodoForm.appendChild(projectContainer);

    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", "addTodoProjectSelector");
    projectLabel.classList.add("project-label");
    projectLabel.textContent = "Project:";
    projectContainer.appendChild(projectLabel);

    const projectSelection = document.createElement("select");
    projectSelection.name = "project";
    projectSelection.id = "addTodoProjectSelector";
    projectContainer.appendChild(projectSelection);

    for (const project of Object.keys(getProjectsContainer())) {
      if (
        project == "_home" ||
        project == "_today" ||
        project == "_week" ||
        project == "_month"
      ) {
        continue;
      }
      const projectId = toCamelCase(project);
      const projectOption = document.createElement("option");
      projectOption.id = projectId;
      projectOption.value = project;
      projectOption.innerText = project;
      projectSelection.appendChild(projectOption);

      if (todo.project == project) {
        projectOption.selected = true;
      }
    }

    const editTodoButtonContainer = document.createElement("div");
    editTodoButtonContainer.classList.add("edit-todo-button-container");
    editTodoForm.appendChild(editTodoButtonContainer);

    const editTodoButton = document.createElement("button");
    editTodoButton.classList.add("edit-todo-button");
    editTodoButton.type = "button";
    editTodoButton.innerText = "Edit Todo";
    editTodoButtonContainer.appendChild(editTodoButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.type = "button";
    cancelButton.innerText = "Cancel";
    editTodoButtonContainer.appendChild(cancelButton);

    let isLowPrioritySelected = false;
    let isMediumPrioritySelected = false;
    let isHighPrioritySelected = false;
    let selectedPriority = 0;

    if (todo.priority == 1) {
      isLowPrioritySelected = true;
      isMediumPrioritySelected = false;
      isHighPrioritySelected = false;
      selectedPriority = 1;
      lowPriorityButton.classList.add("selected");
      mediumPriorityButton.classList.remove("selected");
      highPriorityButton.classList.remove("selected");
    } else if (todo.priority == 2) {
      isLowPrioritySelected = false;
      isMediumPrioritySelected = true;
      isHighPrioritySelected = false;
      selectedPriority = 2;
      lowPriorityButton.classList.remove("selected");
      mediumPriorityButton.classList.add("selected");
      highPriorityButton.classList.remove("selected");
    } else if (todo.priority == 3) {
      isLowPrioritySelected = false;
      isMediumPrioritySelected = false;
      isHighPrioritySelected = true;
      selectedPriority = 3;
      lowPriorityButton.classList.remove("selected");
      mediumPriorityButton.classList.remove("selected");
      highPriorityButton.classList.add("selected");
    }

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

    function editTodoButtonPress() {
      if (!titleInput.value) {
        const titleRequestContainer = document.createElement("dialog");
        titleRequestContainer.classList.add("title-request-container");
        editTodoForm.appendChild(titleRequestContainer);
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

      const editedTodo = createTodo(
        titleInput.value,
        descriptionTextarea.value,
        dueDateInput.value,
        selectedPriority,
        todo.todoStatus,
        projectSelection.value
      );
      editTodo(
        todo.title,
        titleInput.value,
        todo.project,
        projectSelection.value,
        editedTodo
      );
      editTodoIsOpen = false;
      todoContainer.style.height = "4rem";
      description.classList.add("description-is-closed");
      titleDescriptionContainer.style.cursor = "pointer";
      if (projectName == "_home") allTodos();
      if (projectName == "_today") todaysTodos();
      if (projectName == "_week") thisWeeksTodos();
      if (projectName == "_month") thisMonthsTodos();
      renderProjectContent(projectName);
    }

    editTodoButton.addEventListener("click", editTodoButtonPress);
    cancelButton.addEventListener("click", () => {
      editTodoFormContainer.textContent = "";
      todoContainer.style.height = "4rem";
      description.classList.add("description-is-closed");
      titleDescriptionContainer.style.cursor = "pointer";
      editTodoIsOpen = false;
    });
  }

  editTodoSymbol.addEventListener("click", () => {
    if (editTodoIsOpen) {
      editTodoFormContainer.textContent = "";
      editTodoIsOpen = false;
      todoContainer.style.height = "4rem";
      description.classList.add("description-is-closed");
      titleDescriptionContainer.style.cursor = "pointer";
      return;
    }

    editTodoIsOpen = true;
    todoContainer.style.height = "fit-content";
    description.classList.add("description-is-closed");
    titleDescriptionContainer.style.cursor = "default";
    editTodoForm();
  });

  deleteTodoSymbol.addEventListener("click", () => {
    const verifyDeleteContainer = document.createElement("dialog");
    verifyDeleteContainer.classList.add("verify-delete-container");
    editTodoFormContainer.appendChild(verifyDeleteContainer);
    verifyDeleteContainer.showModal();

    const warning = document.createElement("h2");
    warning.classList.add("warning-message");
    warning.innerText = "Are you sure you want to delete this task?";
    verifyDeleteContainer.appendChild(warning);

    const verifyDeleteProjectButtonContainer = document.createElement("div");
    verifyDeleteProjectButtonContainer.classList.add(
      "delete-project-button-container"
    );
    verifyDeleteContainer.appendChild(verifyDeleteProjectButtonContainer);

    const verifyDeleteButton = document.createElement("button");
    verifyDeleteButton.classList.add("delete-button");
    verifyDeleteButton.innerText = "Delete";
    verifyDeleteProjectButtonContainer.appendChild(verifyDeleteButton);

    const verifyCancelButton = document.createElement("button");
    verifyCancelButton.classList.add("cancel-button");
    verifyCancelButton.innerText = "Cancel";
    verifyDeleteProjectButtonContainer.appendChild(verifyCancelButton);

    verifyDeleteButton.addEventListener("click", () => {
      const contentContainer = document.querySelector(".content-container");
      deleteTodoFromProject(todo.project, todo.title);
      contentContainer.removeChild(todoContainer);
    });

    verifyCancelButton.addEventListener("click", () => {
      editTodoFormContainer.removeChild(verifyDeleteContainer);
    });
  });

  return todoContainer;
}

export { renderProjectContent };
