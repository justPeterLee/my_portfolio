import { generateNavMenu } from "./components/navMenu/generateNavMenu";
import { menuSelector, selectedHover } from "./components/navMenu/NavMenu";

import { createProjectPage } from "./components/pages/project/project";
import { createHomePage } from "./components/pages/home/home";
import { createAboutPage } from "./components/pages/about/about";
import { createContactPage } from "./components/pages/contact/contact";
const initalLoad = new Promise((resolve, reject) => {
  createHomePage();
  createAboutPage();
  createProjectPage();
  createContactPage();

  resolve();
});

initalLoad.then(() => {
  generateNavMenu();
  menuSelector();
  selectedHover();
});
