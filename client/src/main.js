import { menuSelector, selectedHover } from "./components/navMenu/NavMenu";
import { createProjectPage } from "./components/pages/project/project";
import { createHomePage } from "./components/pages/home/home";
import { generateNavMenu } from "./components/navMenu/generateNavMenu";
const initalLoad = new Promise((resolve, reject) => {
  createHomePage();
  createProjectPage();

  resolve();
});

initalLoad.then(() => {
  generateNavMenu();
  menuSelector();
  selectedHover();
});
