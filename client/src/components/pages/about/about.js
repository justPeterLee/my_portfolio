import { aboutRender } from "./renderAbout";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";
import { animation } from "../../../utils/animation/animation";
import { menuAnimation } from "../../../utils/animation/menuAnimation";
export const createAboutPage = () => {
  createPage(
    "/about",
    "About",
    "aboutSession",
    undefined,
    aboutRender.rendererContainer,
    { aboutContent },
    menuAnimation.menuSide
  );
};

const aboutContent = new Components(
  "aboutContent",
  aboutRender.aboutContentContainer,
  animation.defaultShow,
  null,
  { isInitial: true }
);
