import { getProjectsContainer, addProject } from "./projects";

const projectNav = document.querySelector("#projectNav");
const content = document.querySelector("#content");

// INITIALIZE PAGE:

function pageInit() {
  populateProjectNav();
}

// LOAD PROJECTS IN NAV:

function populateProjectNav() {
  const projects = getProjectsContainer();

  for (const project in projects) {
    const projectNavElement = document.createElement("li");
    projectNavElement.id = toCamelCase(project);
    projectNavElement.textContent = project;
    projectNav.appendChild(projectNavElement);
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
  projectNav.appendChild(projectNavElement);

  const projectNameInput = document.createElement("input");
  projectNameInput.classList.add("project-name-input");
  projectNameInput.placeholder = "Enter Project Name";
  projectNavElement.appendChild(projectNameInput);
  projectNameInput.focus();

  const navButtonContainer = document.createElement("div");
  navButtonContainer.classList.add("nav-button-container");
  projectNavElement.appendChild(navButtonContainer);

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
    projectNavElement.innerText = projectNameInput.value;
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
