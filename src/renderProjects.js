import {
  getProject,
  addProject,
  renameProject,
  deleteProject,
} from "./projects";
import { renderProjectContent } from "./renderContent";

const projectNav = document.querySelector("#projectNav");

// ADD PROJECTS:

const addProjectToNav = document.querySelector("#addProject");
let addProjectIsOpen = false;

addProjectToNav.addEventListener("click", addProjectMenu);

function addProjectMenu() {
  if (addProjectIsOpen) return;

  addProjectIsOpen = true;

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  projectNav.appendChild(inputContainer);

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
    renderAddProject(projectNameInput.value);
    projectNav.removeChild(inputContainer);

    addProjectIsOpen = false;
  }

  function cancelProjectButton() {
    projectNav.removeChild(inputContainer);
    addProjectIsOpen = false;
  }

  // ADD/CANCEL PROJECT EVENT LISTENERS:

  addButton.addEventListener("click", addProjectButton);
  cancelButton.addEventListener("click", cancelProjectButton);
}

function renderAddProject(projName) {
  const projectNavElement = document.createElement("li");
  projectNavElement.classList.add("project-nav-element");
  projectNavElement.innerText = "";
  projectNav.appendChild(projectNavElement);

  const projectName = document.createElement("p");
  projectName.innerText = projName;
  projectNavElement.appendChild(projectName);

  const optionsContainer = document.createElement("span");
  optionsContainer.classList.add("options-container");
  optionsContainer.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
  projectNavElement.appendChild(optionsContainer);

  projectName.addEventListener("click", () => {
    renderProjectContent(projectName.innerText);
  });

  // PROJECT OPTIONS MENU:

  const optionsMenuListContainer = document.createElement("div");
  optionsMenuListContainer.classList.add("options-menu-list-container");
  optionsContainer.appendChild(optionsMenuListContainer);

  const optionsMenuList = document.createElement("ul");
  optionsMenuList.classList.add("options-menu-list");
  optionsMenuListContainer.appendChild(optionsMenuList);

  const renameProjectOption = document.createElement("li");
  renameProjectOption.innerText = "Rename";
  optionsMenuList.appendChild(renameProjectOption);

  const deleteProjectOption = document.createElement("li");
  deleteProjectOption.innerText = "Delete";
  optionsMenuList.appendChild(deleteProjectOption);

  let editProjectIsOpen = false;

  optionsContainer.addEventListener("click", () => {
    if (editProjectIsOpen) {
      editProjectIsOpen = false;
      optionsMenuListContainer.style.cssText = "display: none;";
      return;
    }

    editProjectIsOpen = true;
    optionsMenuListContainer.style.cssText = "display: block;";
  });

  // EDIT PROJECT NAME:

  renameProjectOption.addEventListener("click", () => {
    projectNavElement.removeChild(projectName);
    projectNavElement.removeChild(optionsContainer);

    const renameProjectContainer = document.createElement("div");
    renameProjectContainer.classList.add("rename-project-container");
    projectNavElement.appendChild(renameProjectContainer);

    const renameProjectInput = document.createElement("input");
    renameProjectInput.type = "text";
    renameProjectInput.classList.add("rename-project-input");
    renameProjectInput.value = projectName.innerText;
    renameProjectContainer.appendChild(renameProjectInput);

    const renameProjectButtonContainer = document.createElement("div");
    renameProjectButtonContainer.classList.add(
      "rename-project-button-container"
    );
    renameProjectContainer.appendChild(renameProjectButtonContainer);

    const renameButton = document.createElement("button");
    renameButton.classList.add("rename-button");
    renameButton.innerText = "Rename";
    renameProjectButtonContainer.appendChild(renameButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.innerText = "Cancel";
    renameProjectButtonContainer.appendChild(cancelButton);

    renameButton.addEventListener("click", () => {
      projectNavElement.removeChild(renameProjectContainer);
      projectName.innerText = renameProjectInput.value;
      renameProject(projName, renameProjectInput.value);
      projectNavElement.appendChild(projectName);
      projectNavElement.appendChild(optionsContainer);
      editProjectIsOpen = false;
      optionsMenuListContainer.style.cssText = "display: none;";
    });

    cancelButton.addEventListener("click", () => {
      projectNavElement.removeChild(renameProjectContainer);
      projectNavElement.appendChild(projectName);
      projectNavElement.appendChild(optionsContainer);
      editProjectIsOpen = false;
      optionsMenuListContainer.style.cssText = "display: none;";
    });
  });

  // DELETE PROJECT:

  deleteProjectOption.addEventListener("click", () => {
    projectNavElement.removeChild(optionsContainer);
    const deleteButtonLineBreaker = document.createElement("div");
    deleteButtonLineBreaker.classList.add("delete-button-line-breaker");
    projectNavElement.appendChild(deleteButtonLineBreaker);

    const deleteProjectContainer = document.createElement("div");
    deleteProjectContainer.classList.add("delete-project-container");
    projectNavElement.appendChild(deleteProjectContainer);

    const deleteProjectButtonContainer = document.createElement("div");
    deleteProjectButtonContainer.classList.add(
      "delete-project-button-container"
    );
    deleteProjectContainer.appendChild(deleteProjectButtonContainer);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Delete";
    deleteProjectButtonContainer.appendChild(deleteButton);

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-button");
    cancelButton.innerText = "Cancel";
    deleteProjectButtonContainer.appendChild(cancelButton);

    // VERIFY DELETE PROJECT:

    deleteButton.addEventListener("click", () => {
      const verifyDeleteContainer = document.createElement("dialog");
      verifyDeleteContainer.classList.add("verify-delete-container");
      projectNavElement.appendChild(verifyDeleteContainer);
      verifyDeleteContainer.showModal();

      const warning = document.createElement("h2");
      warning.classList.add("warning-message");
      warning.innerText = "Are you sure you wish to delete the project?";
      verifyDeleteContainer.appendChild(warning);

      const warningAddOn = document.createElement("h3");
      warningAddOn.classList.add("warning-message");
      warningAddOn.innerText =
        "This will delete the project and all its tasks!";
      verifyDeleteContainer.appendChild(warningAddOn);

      const verifyDeleteProjectButtonContainer = document.createElement("div");
      deleteProjectButtonContainer.classList.add(
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
        deleteProject(projName);
        projectNav.removeChild(projectNavElement);
        projectNavElement.removeChild(verifyDeleteContainer);
      });

      verifyCancelButton.addEventListener("click", () => {
        projectNavElement.removeChild(deleteButtonLineBreaker);
        projectNavElement.removeChild(deleteProjectContainer);
        projectNavElement.removeChild(verifyDeleteContainer);
        projectNavElement.appendChild(optionsContainer);
      });
    });

    // CANCEL DELETE PROJECT:

    cancelButton.addEventListener("click", () => {
      projectNavElement.removeChild(deleteButtonLineBreaker);
      projectNavElement.removeChild(deleteProjectContainer);
      projectNavElement.appendChild(optionsContainer);
    });
  });
}

export { renderAddProject };
