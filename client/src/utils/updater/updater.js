import { pagesObj } from "../../global/Pages";

export const updater = () => {
  const location = window.location.pathname;
  console.log(location);
  console.log(pagesObj);
};
