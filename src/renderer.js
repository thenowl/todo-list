import { getProjectsContainer, addProject } from "./projects";

const projectNav = document.querySelector("#projectNav");
const content = document.querySelector("#content");

// INITIALIZE PAGE:

function pageInit() {
  populateProjectNav();
}

// LOAD PROJECTS TO NAV ON PAGE (RE)LOAD:

function populateProjectNav() {
  const projects = getProjectsContainer();

  for (const project in projects) {
    const projectNavElement = document.createElement("li");
    projectNavElement.classList.add("project-nav-element");
    projectNavElement.id = toCamelCase(project);
    projectNav.appendChild(projectNavElement);

    const projectName = document.createElement("p");
    projectName.innerText = project;
    projectNavElement.appendChild(projectName);

    const optionsContainer = document.createElement("span");
    optionsContainer.classList.add("options-container");
    optionsContainer.innerHTML =
      '<i class="fa-solid fa-ellipsis-vertical"></i>';
    projectNavElement.appendChild(optionsContainer);
  }
}

// ADD PROJECTS:

const addProjectToNav = document.querySelector("#addProject");
let addProjectIsOpen = false;

addProjectToNav.addEventListener("click", addProjectMenu);

function addProjectMenu() {
  if (addProjectIsOpen) return;

  addProjectIsOpen = true;

  const projectNavElement = document.createElement("li");
  projectNavElement.classList.add("project-nav-element");
  projectNav.appendChild(projectNavElement);

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  projectNavElement.appendChild(inputContainer);

  const projectNameInput = document.createElement("input");
  projectNameInput.classList.add("project-name-input");
  projectNameInput.placeholder = "Enter Project Name";
  inputContainer.appendChild(projectNameInput);
  projectNameInput.focus();

  const navButtonContainer = document.createElement("div");
  navButtonContainer.classList.add("nav-button-container");
  inputContainer.appendChild(navButtonContainer);

  const addButton = document.createElement("button");
  addButton.classList.add("add-button");
  addButton.innerText = "Add";
  navButtonContainer.appendChild(addButton);

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-button");
  cancelButton.innerText = "Cancel";
  navButtonContainer.appendChild(cancelButton);

  function addProjectButton() {
    addProject(projectNameInput.value);
    projectNavElement.id = toCamelCase(projectNameInput.value);
    projectNavElement.innerText = "";

    const projectName = document.createElement("p");
    projectName.innerText = projectNameInput.value;
    projectNavElement.appendChild(projectName);

    const optionsContainer = document.createElement("span");
    optionsContainer.classList.add("options-container");
    optionsContainer.innerHTML =
      '<i class="fa-solid fa-ellipsis-vertical"></i>';
    projectNavElement.appendChild(optionsContainer);
    addProjectIsOpen = false;
  }

  function cancelProjectButton() {
    projectNav.removeChild(projectNavElement);
    addProjectIsOpen = false;
  }

  addButton.addEventListener("click", addProjectButton);
  cancelButton.addEventListener("click", cancelProjectButton);
}

function toCamelCase(string) {
  let lowerCase = string.toLowerCase();

  return lowerCase
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
}

export { pageInit };
