import { pagesObj } from "../../global/Pages";

export function generateNavMenu() {
  const menuContainer = document.querySelector("#nav-menu-container");
  const pageKeys = Object.keys(pagesObj);

  console.log(pageKeys);

  for (let i = 0; i < pageKeys.length; i++) {
    console.log(pageKeys[i]);
  }
}
