import { PageInstance } from "../../../global/Pages";
import { projectRender } from "./renderProject";
import { createPage } from "../../../global/Pages";

createPage(
  "/projects",
  "projectSession",
  projectRender.rendererContainer,
  projectRender.renderScrollContent
);
