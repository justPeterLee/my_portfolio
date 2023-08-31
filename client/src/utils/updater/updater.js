import { pagesObj } from "../../global/Pages";
import { menuSelector } from "../../components/navMenu/NavMenu";
export const updater = () => {
  const location = window.location.pathname;

  menuSelector();
  console.log(location);
  console.log(pagesObj);
};
