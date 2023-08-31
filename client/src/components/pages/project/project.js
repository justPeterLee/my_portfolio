import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";

export const createProjectPage = () => {
  createPage(
    "/projects",
    "Project",
    "projectSession",
    undefined,
    projectRender.initial
  );
};
