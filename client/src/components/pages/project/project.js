import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";

export const createProjectPage = () => {
  createPage(
    "/projects",
    "Project",
    "projectSession",
    undefined,
    projectRender.rendererContainer,
    { scrollContentDisplay }
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
