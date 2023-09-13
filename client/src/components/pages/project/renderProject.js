import data from "../../../../public/projects.json";
import "./project.css";
import { projectScroll } from "./scrollClass";
// default view
const body = document.querySelector("body");

export function scrollContainer() {
  console.log(data);

  const centerDiv = document.createElement("div");
  centerDiv.id = "centerDiv";
  body.append(centerDiv);

  const scrollContainer = document.createElement("div");
  scrollContainer.id = "scroll-track";
  scrollContainer.className = "container";

  const keys = Object.keys(data);
  const imagesArr = [];
  keys.forEach((project, index) => {
    // span (main container for project instance)
    const projectContainer = document.createElement("span");
    projectContainer.className = "container project-display-container";
    projectContainer.id = `project-display-${index}`;
    projectContainer.dataset.position = index;
    scrollContainer.appendChild(projectContainer);

    // abosolute container
    const animationContainer = document.createElement("div");
    animationContainer.className = "container animation-container";
    animationContainer.id = `animation-container-${index}`;
    animationContainer.dataset.position = index;

    projectContainer.appendChild(animationContainer);

    // text container
    const scrollTextContainer = document.createElement("div");
    scrollTextContainer.className = "container";
    scrollTextContainer.id = "scroll-text-container";
    animationContainer.appendChild(scrollTextContainer);

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
    const imageDotContainer = document.createElement("div");
    imageDotContainer.className = "dot-container";

    const imageDot = document.createElement("div");
    imageDot.id = `image-triangle-${index}`;
    imageDot.className = "triangle";
    imageDotContainer.appendChild(imageDot);

    const image = document.createElement("img");
    image.dataset.position = index;
    image.id = `image-${index}`;
    image.className = "image";
    image.src = data[project].image;
    image.alt = "image";

    image.style.objectPosition = "center 100%";
    imagesArr.push(image);
    // image
    if (index % 2 === 0) {
      imageDot.style.transform = "rotate(90deg)";
      imageDot.classList.add("tri-right");

      image.style.marginLeft = "2rem";
      scrollTextContainer.style.marginRight = "1rem";

      animationContainer.appendChild(imageDotContainer);
      animationContainer.appendChild(image);
    } else {
      imageDot.style.transform = "rotate(270deg)";
      imageDot.classList.add("tri-right");

      imageDot.dataset.side = "right";
      image.style.marginRight = "2rem";
      scrollTextContainer.style.marginLeft = "1rem";

      animationContainer.prepend(imageDotContainer);
      animationContainer.prepend(image);
    }
    scrollContainer.appendChild(projectContainer);
  });

  scroll = new projectScroll(scrollContainer, centerDiv, imagesArr);

  return scrollContainer;
}

let scroll;
let mousedown = 0;

window.onmousemove = (e) => {
  if (mousedown === 0 || window.location.pathname !== "/projects" || !scroll)
    return;
  if (scroll.moveActive) return;

  scroll.mouseMove = true;

  const mouseDelta = parseFloat(mousedown) - e.clientY;
  const maxDelta = window.innerHeight / 2;
  const percentage = (mouseDelta / maxDelta) * -100;

  scroll.scrollPercent(percentage);
  scroll.scrollAnimation(scroll.percent);
  scroll.imageParallax(scroll.percent);
};

window.onmousedown = (e) => {
  if (window.location.pathname !== "/projects" || !scroll) return;
  // if (scroll.moveActive) return;
  mousedown = e.clientY;
};

window.onmouseup = (e) => {
  if (window.location.pathname !== "/projects" || !scroll) return;
  // if (scroll.moveActive) return;
  setTimeout(() => {
    scroll.mouseMove = false;
  }, 100);
  mousedown = 0;
  scroll.cachePercent();
};

let scrollingStoppedTimeout;

body.addEventListener("wheel", (event) => {
  // scroll detection
  const deltaY = event.deltaY;
  clearTimeout(scrollingStoppedTimeout);

  scrollingStoppedTimeout = setTimeout(function () {
    scroll.cachePercent();
  }, 200);

  // change percentage

  if (deltaY > 0) {
    scroll.scrollUp();
  } else if (deltaY < 0) {
    scroll.scrollDown();
  }
});

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
