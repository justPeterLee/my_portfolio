import { PageInstance } from "../../../global/Pages";
import { projectRender } from "./renderProject";

const projectPage = new PageInstance(
  "/projects",
  "projectSession",
  projectRender.rendererContainer,
  projectRender.renderScrollContent
);
