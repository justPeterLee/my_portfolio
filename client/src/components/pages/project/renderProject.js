import data from "../../../../public/projects.json";
// default view
export function scrollContainer() {
  console.log(data);
  const scrollContainer = document.createElement("div");
  scrollContainer.id = "project-container";
  scrollContainer.className = "scroll-container";

  const mainContainer = document.createElement("div");
  mainContainer.id = "main-display-container";
  scrollContainer.appendChild(mainContainer);

  const content = document.createElement("p");
  content.id = "project-scroll-content";
  content.innerHTML = "project";

  scrollContainer.appendChild(content);

  return scrollContainer;
}

export function scrollMenu() {
  const scrollMenuContainer = document.createElement("div");
  scrollMenuContainer.id = "scroll-menu-container";

  const content = document.createElement("p");
  content.id = "scroll-menu-text";
  content.innerHTML = "scroll menu";

  scrollMenuContainer.appendChild(content);

  return scrollMenuContainer;
}

export const projectRender = {
  scrollContainer,
  scrollMenu,
};
