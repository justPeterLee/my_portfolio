import data from "../../../../public/projects.json";
import "./project.css";
// default view
export function scrollContainer() {
  console.log(data);
  const scrollContainer = document.createElement("div");
  scrollContainer.id = "scroll-track";
  scrollContainer.className = "container";

  // const mainContainer = document.createElement("div");
  // mainContainer.className = "container";
  // mainContainer.id = "main-display-container";
  // scrollContainer.appendChild(mainContainer);

  const keys = Object.keys(data);

  keys.forEach((project, index) => {
    console.log(data[project].title);
    console.log(index);
    // span (main container for project instance)
    const projectContainer = document.createElement("span");
    projectContainer.className = "container";
    projectContainer.id = "project-display-container";
    scrollContainer.appendChild(projectContainer);

    // text container
    const scrollTextContainer = document.createElement("div");
    scrollTextContainer.className = "container";
    scrollTextContainer.id = "scroll-text-container";
    projectContainer.appendChild(scrollTextContainer);

    //title
    const title = document.createElement("p");
    title.id = "scroll-title";
    title.innerHTML = data[project].title;
    scrollTextContainer.appendChild(title);

    // subtitle
    const subTitle = document.createElement("p");
    subTitle.id = "scroll-subtitle";
    subTitle.innerHTML = data[project].subTitle;
    scrollTextContainer.appendChild(subTitle);

    // date
    const date = document.createElement("p");
    date.id = "scroll-date";
    date.innerHTML = data[project].time;
    scrollTextContainer.appendChild(date);

    // links container
    const linkContainer = document.createElement("div");
    linkContainer.id = "link-container";
    linkContainer.className = "container";
    scrollTextContainer.appendChild(linkContainer);

    // links
    const siteLink = document.createElement("a");
    siteLink.innerHTML = "site";
    siteLink.id = "site-link";
    siteLink.className = "link";
    linkContainer.appendChild(siteLink);

    //dot
    const linkDot = document.createElement("div");
    linkDot.id = "link-dot";
    linkContainer.appendChild(linkDot);

    const codeLink = document.createElement("a");
    codeLink.innerHTML = "code";
    codeLink.id = "code-link";
    codeLink.className = "link";
    linkContainer.appendChild(codeLink);

    // image dot
    const imageDot = document.createElement("div");
    imageDot.id = "image-dot";
    imageDot.className = "triangle";

    // image container
    const imageContainer = document.createElement("div");
    imageContainer.id = "image-container";

    // image
    if (index % 2 === 0) {
      imageDot.style.transform = "rotate(90deg)";

      projectContainer.appendChild(imageDot);
      projectContainer.appendChild(imageContainer);
    } else {
      imageDot.style.transform = "rotate(270deg)";

      projectContainer.prepend(imageDot);
      projectContainer.prepend(imageContainer);
    }
    scrollContainer.appendChild(projectContainer);
  });

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
