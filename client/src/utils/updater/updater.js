import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
import { rendered } from "../../global/Rendered";
import { display } from "../../global/Display";
import { menuAnimation } from "../animation/menuAnimation";

let isInital = true;

export const updater = () => {
  const location = window.location.pathname;
  const pageInstance = pagesObj[location];
  console.log(pageInstance);
  menuSelector();
  // menuAnimation.menuSide(true);
  pageInstance.menu(isInital);
  if (rendered.Rendered[pageInstance.sessionKey]) {
    display.showComponent(pageInstance, false);
  } else {
    display.showComponent(pageInstance, true);
  }

  console.log(display);

  isInital = false;
};
