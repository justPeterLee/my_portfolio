import { menuSelector } from "./components/navMenu/NavMenu";
import { createProjectPage } from "./components/pages/project/project";
import { createPage } from "./global/Pages";
function initalLoad() {
  createPage("/", "homeSession", () => {});
  createProjectPage();
}

initalLoad();
