// import cross from "../../../../public/cross.svg";
import data from "../../../../public/projects.json";
import "./project.css";
import { projectScroll } from "./scrollClass";
import { showTL, hideTL } from "../../../utils/animation/projectAnimation";
// default view
const body = document.querySelector("body");

export function scrollContainer() {
  console.log(data);

  // -----------------------------------------------
  // outter divs
  // -----------------------------------------------

  const centerDiv = document.createElement("div");
  centerDiv.id = "centerDiv";
  centerDiv.className = "container";
  body.append(centerDiv);

  const scrollContainer = document.createElement("div");
  scrollContainer.id = "scroll-track";
  scrollContainer.className = "container";

  // -----------------------------------------------
  // project nodes
  // -----------------------------------------------
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
    scrollTextContainer.className = "container text-container";
    scrollTextContainer.id = `scroll-text-container-${index}`;
    scrollTextContainer.dataset.position = index;
    animationContainer.appendChild(scrollTextContainer);

    //animation text container
    const animationTextContainer = document.createElement("div");
    animationTextContainer.className = "container animation-text-container";
    animationTextContainer.id = `animation-text-container-${index}`;
    animationTextContainer.dataset.position = index;
    scrollTextContainer.appendChild(animationTextContainer);

    //title
    const title = document.createElement("p");
    title.id = "scroll-title";
    title.innerHTML = data[project].title;
    animationTextContainer.appendChild(title);

    // subtitle
    const subTitle = document.createElement("p");
    subTitle.id = "scroll-subtitle";
    subTitle.innerHTML = data[project].subTitle;
    animationTextContainer.appendChild(subTitle);

    // date
    const date = document.createElement("p");
    date.id = "scroll-date";
    date.innerHTML = data[project].time;
    animationTextContainer.appendChild(date);

    // links container
    const linkContainer = document.createElement("div");
    linkContainer.id = "link-container";
    linkContainer.className = "container";
    animationTextContainer.appendChild(linkContainer);

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

    // ------------------------------------------------
    // description generator
    // ------------------------------------------------

    scrollDescription(data[project].description, scrollTextContainer, index);

    // ------------------------------------------------
    // image
    // ------------------------------------------------

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

    // ------------------------------------------------
    // image direction
    // ------------------------------------------------

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
  if (
    mousedown === 0 ||
    window.location.pathname !== "/projects" ||
    !scroll ||
    scroll.moveActive
  )
    return;

  const mouseDelta = parseFloat(mousedown) - e.clientY;
  const maxDelta = window.innerHeight / 2;
  const percentage = (mouseDelta / maxDelta) * -100;

  scroll.scrollPercent(percentage);

  if (percentage <= -2 || percentage >= 2) {
    scroll.mouseMove = true;
  }

  if (!scroll.isFocus) {
    scroll.scrollAnimation(scroll.percent);
    scroll.imageParallax(scroll.percent + 100);
  } else {
    if (percentage <= -7 || percentage >= 7) {
      scroll.unFocus();
    }
  }
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

// --------------------------------
// scroll menu
// --------------------------------

export function scrollMenu() {
  const scrollMenuContainer = document.createElement("div");
  scrollMenuContainer.id = "scroll-menu-container";

  const content = document.createElement("p");
  content.id = "scroll-menu-text";
  content.innerHTML = "scroll menu";

  scrollMenuContainer.appendChild(content);

  return scrollMenuContainer;
}

// -------------------------------
// description generator
// -------------------------------

export function scrollDescription(data, parent, index) {
  const textArr = data.what.split(" ");
  const textKey = Object.keys(data);
  let descriptionData = {};

  textKey.forEach((title) => {
    const dataInfo = data[title];

    if (typeof dataInfo === "string") {
      const textArr = dataInfo.split(" ");
      const textArrGroup = [];
      for (let i = 0; i < textArr.length; i += 4) {
        const group = textArr.slice(i, i + 4);
        textArrGroup.push(group.join(" "));
      }
      // console.log(textArrGroup);
      descriptionData[title] = textArrGroup;
    }
  });

  // let textArrGroup = [];

  let position = null;
  // console.log(textKey);
  // container
  const descriptionContainer = document.createElement("div");
  descriptionContainer.id = `description-container-${index}`;
  descriptionContainer.className = "description-container";
  if (parseInt(index) % 2 === 0) {
    descriptionContainer.style.right = 0;
  } else {
    descriptionContainer.style.left = 0;
  }

  // title
  const titleContianer = document.createElement("h3");
  titleContianer.className = "slide-up-text";
  descriptionContainer.appendChild(titleContianer);

  // text
  const textContainer = document.createElement("p");
  textContainer.className = "slide-up-text";
  descriptionContainer.appendChild(textContainer);

  // generate text
  const descriptionDataKey = Object.keys(descriptionData);
  console.log(descriptionData);
  descriptionDataKey.forEach((title) => {
    position = textBlockGenerator(title, titleContianer, position);
    for (let i = 0; i < descriptionData[title].length; i++) {
      position = textBlockGenerator(
        descriptionData[title][i],
        textContainer,
        position
      );
    }
  });

  // // text block
  // position = textBlockGenerator("What", titleContianer, position);
  // position = textBlockGenerator("Why", titleContianer, position);
  // position = textBlockGenerator("How", titleContianer, position);

  // // text block
  // position = textBlockGenerator(
  //   "So this is the start Huh... welp",
  //   textContainer,
  //   position
  // );
  // position = textBlockGenerator(
  //   "This is what we are really talking about",
  //   textContainer,
  //   position
  // );
  // position = textBlockGenerator(
  //   "This is just random text that is showing",
  //   textContainer,
  //   position
  // );
  // position = textBlockGenerator(
  //   "this is even more reasn to show why we",
  //   textContainer,
  //   position
  // );
  // position = textBlockGenerator(
  //   "iiiiiiiiii iiiiiiiiii iiiiiiiiii 1234567890 1234567890 ",
  //   textContainer,
  //   position
  // );

  parent.appendChild(descriptionContainer);

  return descriptionContainer;
}

function textBlockGenerator(text, parent, position) {
  let proxyPosition = position;
  if (position === null) {
    proxyPosition = 0;
  } else {
    proxyPosition += 1;
  }
  // hidden block
  const hiddenContainer = document.createElement("span");
  hiddenContainer.className = "hidden-text";
  parent.appendChild(hiddenContainer);

  const textBlock = document.createElement("span");
  textBlock.id = `text-${proxyPosition}`;
  textBlock.className = "text";
  textBlock.innerHTML = text;

  // textBlock.style.position = "absolute";
  // textBlock.style.top = -10;
  textBlock.style.opacity = 0;
  hiddenContainer.appendChild(textBlock);

  return proxyPosition;
}
export const projectRender = {
  scrollContainer,
  scrollMenu,
  scrollDescription,
};
