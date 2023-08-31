import { pagesObj } from "../../global/Pages";

export function generateNavMenu() {
  const menuContainer = document.querySelector("#nav-menu-container");
  const pageKeys = Object.keys(pagesObj);

  console.log(pageKeys);

  for (let i = 0; i < pageKeys.length; i++) {
    console.log(pageKeys[i]);
    const textContainer = document.createElement("span");
    textContainer.id = "link-not-selected";
    textContainer.className = "nav-menu-text-container";
    textContainer.dataset.pathname = pageKeys[i];

    textContainer.innerHTML = `<div class="dot"></div> <a href="${
      pageKeys[i]
    }" class="page-links">${pagesObj[pageKeys[i]].title}</a>`;

    menuContainer.appendChild(textContainer);
  }
}
