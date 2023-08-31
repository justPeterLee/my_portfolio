import { createPage } from "../../../global/Pages";
import { homeInitial } from "./renderHome";

export const createHomePage = () => {
  createPage("/", "Home", "homeSession", undefined, homeInitial);
};
