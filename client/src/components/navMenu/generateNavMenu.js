import { pagesObj } from "../../global/Pages";

export function generateNavMenu() {
  const menuContainer = document.querySelector("#nav-menu-container");
  const pageKeys = Object.keys(pagesObj);

  console.log(pageKeys);

  for (let i = 0; i < pageKeys.length; i++) {
    console.log(pageKeys[i]);
    const textContainer = document.createElement("span");
    textContainer.id = "link-not-selected";
    textContainer.class = "nav-menu-text-container";
    textContainer.innerHTML = `<div class="dot"></div> <a href="${pageKeys[i]}" class="page-links">${pageKeys[i]}</a>`;

    menuContainer.appendChild(textContainer);
  }
}
