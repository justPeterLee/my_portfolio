import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";
import { menuAnimation } from "../../../utils/animation/menuAnimation";

export const createProjectPage = () => {
  createPage(
    "/projects",
    "Project",
    "projectSession",
    undefined,
    projectRender.rendererContainer,
    { scrollContentDisplay },
    menuAnimation.menuSide
  );
};

const scrollContentDisplay = new Components(
  "scrollContainer",
  projectRender.renderScrollContent,
  null,
  null,
  { isInitial: true }
);

// const descriptionContent = new Components(
//   // projectRender.
// )
