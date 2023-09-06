import data from "../../../../public/projects.json";
import "./project.css";
// default view
export function scrollContainer() {
  console.log(data);
  const scrollContainer = document.createElement("div");
  scrollContainer.id = "project-container";
  scrollContainer.className = "scroll-container";

  const mainContainer = document.createElement("div");
  mainContainer.className = "container";
  mainContainer.id = "main-display-container";
  scrollContainer.appendChild(mainContainer);

  const keys = Object.keys(data);

  keys.forEach((project) => {
    console.log(data[project].title);
    // span (main container for project instance)
    const projectContainer = document.createElement("span");
    projectContainer.className = "container";
    projectContainer.id = "project-display-container";
    mainContainer.appendChild(projectContainer);

    // text container
    const scrollTextContainer = document.createElement("div");
    scrollTextContainer.className = "container";
    scrollTextContainer.id = "scroll-text-container";
    projectContainer.appendChild(scrollTextContainer);

    // title container
    const titleContainer = document.createElement("span");
    titleContainer.className = "container";
    titleContainer.id = "project-title-subtitle";
    scrollContainer.appendChild(titleContainer);
    //title
    const title = document.createElement("p");
    title.id = "scroll-title";
    title.innerHTML = data[project].title;
    titleContainer.appendChild(title);

    // subtitle
    const subTitle = document.createElement("p");
    subTitle.id = "scroll-subtitle";
    subTitle.innerHTML = data[project].subTitle;
    titleContainer.appendChild(subTitle);

    // date
    const date = document.createElement("p");
    date.id = "scroll-date";
    date.innerHTML = data[project].time;
    scrollTextContainer.appendChild(date);

    mainContainer.appendChild(projectContainer);
  });

  const content = document.createElement("p");
  content.id = "project-scroll-content";
  content.innerHTML = "project";

  scrollContainer.appendChild(content);

  scrollContainerEvent(scrollContainer);
  return scrollContainer;
}

function scrollContainerEvent(scrollContainer) {
  let isScrolling = false;
  let timeout;

  function handleScroll() {
    if (!isScrolling) {
      isScrolling = true;
    }
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      // Scrolling has stopped
      console.log("Scrolling stopped");
      isScrolling = false;
    }, 100);
  }

  scrollContainer.addEventListener("scroll", handleScroll);
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
