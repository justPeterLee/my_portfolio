import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
import { rendered } from "../../global/Rendered";
import { display } from "../../global/Display";

let isInital = true;

export const updater = () => {
  const location = window.location.pathname;
  const pageInstance = pagesObj[location];
  menuSelector();
  // menuAnimation.menuSide(true);
  pageInstance.menu(isInital);

  // only do this if is able to show
  display.avalible(pageInstance);

  // display.InProcess();
  isInital = false;
};
