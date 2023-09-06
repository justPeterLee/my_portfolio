import { createPage } from "../../../global/Pages";
import { homeRender } from "./renderHome";
import { Components } from "../../../global/Components";
export const createHomePage = () => {
  createPage("Home", "/", { empty });
};

const empty = new Components("empty", homeRender.emptyContent, null, null, {
  isInitial: true,
});
