import { createPage } from "../../../global/Pages";
import { homeRender } from "./renderHome";

export const createHomePage = () => {
  createPage(
    "/",
    "Home",
    "homeSession",
    undefined,
    homeRender.homeRendererContainer
  );
};
