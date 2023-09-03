import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
import { rendered } from "../../global/Rendered";
import { display } from "../../global/Display";

export const updater = () => {
  const location = window.location.pathname;
  const pageInstance = pagesObj[location];

  menuSelector();

  if (rendered.Rendered[pageInstance.sessionKey]) {
    display.showComponent(pageInstance);
  } else {
    display.showComponent(pageInstance, true);
  }

  console.log(display);
};
