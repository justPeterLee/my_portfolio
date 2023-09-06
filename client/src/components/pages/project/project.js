import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";
import { menuAnimation } from "../../../utils/animation/menuAnimation";

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
  null,
  null,
  { isInitial: true }
);

const scrollMenu = new Components(
  "scrollMenu",
  projectRender.scrollMenu,
  null,
  null,
  { isInitial: true }
);
