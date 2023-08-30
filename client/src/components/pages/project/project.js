import { PageInstance } from "../../../global/Pages";
import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";

export const createProjectPage = () => {
  createPage("/projects", "projectSession", projectRender.initial);
};