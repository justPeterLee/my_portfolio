import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
import { rendered } from "../../global/Rendered";

export const updater = () => {
  const location = window.location.pathname;
  const pageInstance = pagesObj[location];

  menuSelector();

  console.log(pageInstance.sessionKey);

  if (rendered.Rendered[pageInstance.sessionKey]) {
    console.log(rendered);
  } else {
    // const initialRender = pageInstance.initialRender;
    pageInstance.initialRender(pageInstance.parent).then(() => {
      rendered.rendering(pageInstance);
    });
    // console.log(initialRender);
  }
};
