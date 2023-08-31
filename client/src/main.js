import { menuSelector, selectedHover } from "./components/navMenu/NavMenu";
import { createProjectPage } from "./components/pages/project/project";
import { createPage } from "./global/Pages";
import { generateNavMenu } from "./components/navMenu/generateNavMenu";
const initalLoad = new Promise((resolve, reject) => {
  createPage("/", "Home", "homeSession", () => {});
  createProjectPage();

  resolve();
});

initalLoad.then(() => {
  generateNavMenu();
  menuSelector();
  selectedHover();
});
