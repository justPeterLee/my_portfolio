import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
import { rendered } from "../../global/Rendered";
import { display } from "../../global/Display";
import { menuAnimation } from "../animation/menuAnimation";

export const updater = () => {
  const location = window.location.pathname;
  const pageInstance = pagesObj[location];

  menuSelector();
  menuAnimation.menuSide(true);
  if (rendered.Rendered[pageInstance.sessionKey]) {
    display.showComponent(pageInstance);
  } else {
    display.showComponent(pageInstance, true);
  }

  console.log(display);
};
