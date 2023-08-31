import { aboutGenerator } from "./renderAbout";
import { createPage } from "../../../global/Pages";

export const createAboutPage = () => {
  createPage(
    "/about",
    "About",
    "aboutSession",
    undefined,
    aboutGenerator.initial
  );
};
