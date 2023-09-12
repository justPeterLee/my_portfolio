import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";
import { menuAnimation } from "../../../utils/animation/menuAnimation";
import { projectAnimation } from "../../../utils/animation/projectAnimation";
export const createProjectPage = () => {
  createPage(
    "Projects",
    "/projects",
    { scrollContainer },
    menuAnimation.menuSide
  );
};

const scrollContainer = new Components(
  "scrollContainer",
  projectRender.scrollContainer,
  projectAnimation.showProject,
  projectAnimation.hideProject,
  { isInitial: true }
);

const scrollMenu = new Components(
  "scrollMenu",
  projectRender.scrollMenu,
  null,
  null,
  { isInitial: true }
);
