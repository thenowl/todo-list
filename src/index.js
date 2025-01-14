import "./styles.css";
import { initProjects } from "./projects";
import { pageInit } from "./renderer";

delete localStorage.projectsContainer;

if (localStorage.length == 0) {
  initProjects();
  pageInit();
} else {
  pageInit();
}
