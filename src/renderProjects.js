import {
  allTodos,
  todaysTodos,
  thisWeeksTodos,
  thisMonthsTodos,
  addProject,
  renameProject,
  deleteProject,
} from "./projects";
import { renderProjectContent } from "./renderContent";

const nav = document.querySelector("#nav");
const projectNav = document.querySelector("#projectNav");

// ADD PROJECTS:

const addProjectToNav = document.querySelector("#addProject");
let addProjectIsOpen = false;

addProjectToNav.addEventListener("click", renderAddProjectMenu);

function renderAddProjectMenu() {
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
    if (
      !projectNameInput.value ||
      projectNameInput.value == "_home" ||
      projectNameInput.value == "_today" ||
      projectNameInput.value == "_week" ||
      projectNameInput.value == "_month"
    ) {
      const titleRequestContainer = document.createElement("dialog");
      titleRequestContainer.classList.add("title-request-container");
      inputContainer.appendChild(titleRequestContainer);
      titleRequestContainer.showModal();

      const warning = document.createElement("h2");
      warning.classList.add("warning-message");
      if (!projectNameInput.value) {
        warning.innerText = "Please enter a title for your project";
      } else {
        warning.innerText =
          "This project name is reserved by the app and cannot be used.";
      }
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
    addProject(projectNameInput.value);
    renderProject(projectNameInput.value);
    renderProjectContent(projectNameInput.value);
    projectNav.removeChild(inputContainer);

    addProjectIsOpen = false;
  }

  function cancelProjectButton() {
    projectNav.removeChild(inputContainer);
    addProjectIsOpen = false;
  }

  // ADD/CANCEL ADD PROJECT EVENT LISTENERS:

  addButton.addEventListener("click", addProjectButton);
  cancelButton.addEventListener("click", cancelProjectButton);
}

function renderProject(projName) {
  if (
    projName == "_home" ||
    projName == "_today" ||
    projName == "_week" ||
    projName == "_month"
  ) {
    return;
  }
  const projectNavElement = document.createElement("li");
  projectNavElement.classList.add("project-nav-element");
  projectNavElement.innerText = "";
  projectNav.appendChild(projectNavElement);

  const projectNameContainer = document.createElement("div");
  projectNameContainer.classList.add("nav-project-name-container");
  projectNavElement.appendChild(projectNameContainer);

  const projectName = document.createElement("p");
  projectName.innerText = projName;
  projectNameContainer.appendChild(projectName);

  projectName.addEventListener("click", () => {
    const liElements = nav.querySelectorAll("li");
    liElements.forEach((element) => {
      element.classList.remove("selected-project");
    });
    projectNavElement.classList.add("selected-project");
    renderProjectContent(projectName.innerText);
  });

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("project-options-container");
  projectNavElement.appendChild(optionsContainer);

  const editProjectNameSymbol = document.createElement("span");
  editProjectNameSymbol.classList.add("edit-project-name-symbol");
  editProjectNameSymbol.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  optionsContainer.appendChild(editProjectNameSymbol);

  const deleteProjectSymbol = document.createElement("span");
  deleteProjectSymbol.classList.add("delete-project-symbol");
  deleteProjectSymbol.innerHTML = '<i class="fa-solid fa-trash"></i>';
  optionsContainer.appendChild(deleteProjectSymbol);

  // EDIT PROJECT NAME:

  editProjectNameSymbol.addEventListener("click", () => {
    projectNavElement.removeChild(projectNameContainer);
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
      if (
        !renameProjectInput.value ||
        renameProjectInput.value == "_home" ||
        renameProjectInput.value == "_today" ||
        renameProjectInput.value == "_week" ||
        renameProjectInput.value == "_month"
      ) {
        const titleRequestContainer = document.createElement("dialog");
        titleRequestContainer.classList.add("title-request-container");
        renameProjectContainer.appendChild(titleRequestContainer);
        titleRequestContainer.showModal();

        const warning = document.createElement("h2");
        warning.classList.add("warning-message");
        if (!renameProjectInput.value) {
          warning.innerText = "Please enter a title for your project";
        } else {
          warning.innerText =
            "This project name is reserved by the app and cannot be used.";
        }
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
      projectNavElement.removeChild(renameProjectContainer);
      projectName.innerText = renameProjectInput.value;
      renameProject(projName, renameProjectInput.value);
      renderProject(renameProjectInput.value);
      renderProjectContent(renameProjectInput.value);
    });

    cancelButton.addEventListener("click", () => {
      projectNavElement.removeChild(renameProjectContainer);
      projectNavElement.appendChild(projectNameContainer);
      projectNavElement.appendChild(optionsContainer);
    });
  });

  // DELETE PROJECT:

  deleteProjectSymbol.addEventListener("click", () => {
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
    warningAddOn.innerText = "This will delete the project and all its tasks!";
    verifyDeleteContainer.appendChild(warningAddOn);

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
      deleteProject(projName);
      projectNav.removeChild(projectNavElement);
      projectNavElement.removeChild(verifyDeleteContainer);
    });

    verifyCancelButton.addEventListener("click", () => {
      projectNavElement.removeChild(verifyDeleteContainer);
      projectNavElement.appendChild(optionsContainer);
    });
  });
}

const home = document.querySelector("#home");

home.addEventListener("click", () => {
  const liElements = nav.querySelectorAll("li");
  liElements.forEach((element) => {
    element.classList.remove("selected-project");
  });
  home.classList.add("selected-project");
  allTodos();
  renderProjectContent("_home");
});

const today = document.querySelector("#today");

today.addEventListener("click", () => {
  const liElements = nav.querySelectorAll("li");
  liElements.forEach((element) => {
    element.classList.remove("selected-project");
  });
  today.classList.add("selected-project");
  todaysTodos();
  renderProjectContent("_today");
});

const week = document.querySelector("#week");

week.addEventListener("click", () => {
  const liElements = nav.querySelectorAll("li");
  liElements.forEach((element) => {
    element.classList.remove("selected-project");
  });
  week.classList.add("selected-project");
  thisWeeksTodos();
  renderProjectContent("_week");
});

const month = document.querySelector("#month");

month.addEventListener("click", () => {
  const liElements = nav.querySelectorAll("li");
  liElements.forEach((element) => {
    element.classList.remove("selected-project");
  });
  month.classList.add("selected-project");
  thisMonthsTodos();
  renderProjectContent("_month");
});

const burgerMenu = document.querySelector("#burgerMenu");
let navIsOpen = false;

burgerMenu.addEventListener("click", () => {
  if (navIsOpen) {
    navIsOpen = false;
    nav.classList.remove("unhide");
    return;
  }
  navIsOpen = true;
  nav.classList.add("unhide");
});

export { renderProject };
