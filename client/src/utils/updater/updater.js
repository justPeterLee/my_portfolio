import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
import { rendered } from "../../global/Rendered";
import { display } from "../../global/Display";

export const updater = () => {
  const location = window.location.pathname;
  const pageInstance = pagesObj[location];

  menuSelector();

  console.log(pageInstance.sessionKey);

  if (rendered.Rendered[pageInstance.sessionKey]) {
    console.log(rendered);
  } else {
    console.log(pageInstance);
    display.renderComponent(pageInstance);
  }

  console.log(display);
};
