import data from "../../../../public/projects.json";
import "./project.css";
import { projectScroll } from "./scrollClass";
// default view
export function scrollContainer() {
  console.log(data);
  const body = document.querySelector("body");

  const centerDiv = document.createElement("div");
  centerDiv.id = "centerDiv";
  body.append(centerDiv);

  const centerText = document.createElement("p");
  centerText.dataset.center = "none";
  centerText.innerHTML = centerText.dataset.center;

  centerDiv.appendChild(centerText);

  const scrollContainer = document.createElement("div");
  scrollContainer.id = "scroll-track";
  scrollContainer.className = "container";

  const keys = Object.keys(data);
  const imagesArr = [];
  const imagePos = [];
  keys.forEach((project, index) => {
    // span (main container for project instance)
    const projectContainer = document.createElement("span");
    projectContainer.className = "container project-display-container";
    projectContainer.id = `project-display-${index}`;
    projectContainer.dataset.position = index;
    scrollContainer.appendChild(projectContainer);

    // abosolute container
    const animationContainer = document.createElement("div");
    animationContainer.className = "animation-container";
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
    const imageDot = document.createElement("div");
    imageDot.id = "image-dot";
    imageDot.className = "triangle";

    // image container
    const imageContainer = document.createElement("div");
    imageContainer.id = "image-container";
    imageContainer.dataset.position = index;

    const image = document.createElement("img");
    image.dataset.position = index;
    image.id = `image-${index}`;
    image.className = "image";
    image.src = data[project].image;
    imageContainer.appendChild(image);

    imagesArr.push(image);
    imagePos.push(imageContainer);
    // image
    if (index % 2 === 0) {
      imageDot.style.transform = "rotate(90deg)";

      animationContainer.appendChild(imageDot);
      animationContainer.appendChild(imageContainer);
    } else {
      imageDot.style.transform = "rotate(270deg)";

      animationContainer.prepend(imageDot);
      animationContainer.prepend(imageContainer);
    }
    scrollContainer.appendChild(projectContainer);
  });

  scroll = new projectScroll(scrollContainer, centerDiv, imagesArr, imagePos);

  return scrollContainer;
}

let scroll;
let mousedown = 0;

window.onmousemove = (e) => {
  if (mousedown === 0 || window.location.pathname !== "/projects" || !scroll)
    return;

  const mouseDelta = parseFloat(mousedown) - e.clientY;
  const maxDelta = window.innerHeight / 2;
  const percentage = (mouseDelta / maxDelta) * -100;

  // console.log(percentage);
  scroll.scrollPercent(percentage);

  scroll.scrollAnimation(scroll.percent);
};

window.onmousedown = (e) => {
  if (window.location.pathname !== "/projects" || !scroll) return;
  mousedown = e.clientY;
};

window.onmouseup = (e) => {
  if (window.location.pathname !== "/projects" || !scroll) return;
  mousedown = 0;
  scroll.cachePercent();
};

// movement system
// - drag, scroll, key input
// - moving scroll track
//    - percentage
//    - animation
// hold a percentage

function center(element, centerEle) {
  const elementPos = element.getBoundingClientRect();
  const centerPos = centerEle.getBoundingClientRect();

  const areTouching = !(
    elementPos.right < centerPos.left ||
    elementPos.left > centerPos.right ||
    elementPos.bottom < centerPos.top ||
    elementPos.top > centerPos.bottom
  );

  if (areTouching) {
    if (centerEle.children[0].innerHTML !== element.dataset.position) {
      centerEle.children[0].innerHTML = element.dataset.position;
    }
  }
}

function scrollEvent(scrollContainer, imagesArr, imagePos, centerDiv) {
  let scrollHeight = 0;
  let percentIncrement = 0;

  let mousedown = 0;
  let oldPercentage = 0;
  let currPercentage = 0;
  let newPercentage = 0;

  let newImagePercentage = 0;
  let trackImage = {};

  let scrollingStoppedTimeout;

  const centerDivPos = centerDiv.getBoundingClientRect();
  const centerDivCenter = centerDivPos.top + centerDivPos.height / 2;

  const body = document.querySelector("body");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const position = entry.target.dataset.position;
      if (entry.isIntersecting) {
        trackImage[position] = entry.target;
      } else if (!entry.isIntersecting) {
        if (trackImage[position]) {
          delete trackImage[position];
        }
      }
    });
  });

  const scrollContainerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        scrollHeight = entry.boundingClientRect.height;
        percentIncrement = (1 / scrollHeight) * 100;
        scrollContainerObserver.unobserve(entry.target);
      }
    });
  });

  scrollContainerObserver.observe(scrollContainer);
  imagePos.forEach((element) => {
    observer.observe(element);
    console.log(element);
    element.addEventListener("click", (event) => {
      const parent = event.target.parentNode;
      const parentPos = parent.getBoundingClientRect();
      const parentCenter = parentPos.top + parentPos.height / 2;

      newPercentage = moveToCenter(
        parentCenter,
        centerDivCenter,
        scrollHeight,
        scrollContainer,
        newPercentage,
        imagesArr
      );

      currPercentage = newPercentage;
    });
  });

  body.addEventListener("wheel", (event) => {
    // scroll detection
    const deltaY = event.deltaY;
    clearTimeout(scrollingStoppedTimeout);
    scrollingStoppedTimeout = setTimeout(function () {
      oldPercentage = currPercentage;
    }, 200);

    // change percentage
    if (deltaY > 0) {
      if (newPercentage >= -80) {
        newPercentage -= 5;
      }
    } else if (deltaY < 0) {
      if (newPercentage <= 1) {
        newPercentage += 5;
      }
    }
    if (newPercentage < -80) {
      newPercentage = -79.9;
    }
    if (newPercentage > 1) {
      newPercentage = 0.9;
    }

    // track percent
    currPercentage = newPercentage;

    newImagePercentage = (newPercentage / 100) * 0.5 * 66.6;

    const keys = Object.keys(trackImage);

    keys.forEach((key) => {
      center(trackImage[key], centerDiv);
    });
    // animation
    scrollAnimation(
      scrollContainer,
      imagesArr,
      newPercentage,
      newImagePercentage
    );
  });

  window.onmousemove = (e) => {
    if (mousedown === 0) return;
    const mouseDelta = parseFloat(mousedown) - e.clientY;
    const maxDelta = window.innerHeight / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    console.log(mouseDelta);
    if (newPercentage >= -86 && newPercentage <= 1) {
      newPercentage = oldPercentage + percentage;
    }
    if (newPercentage < -86) {
      newPercentage = -85.9;
    }
    if (newPercentage > 1) {
      newPercentage = 0;
    }

    currPercentage = newPercentage;

    newImagePercentage = (newPercentage / 100) * 0.8 * -33.3;

    const keys = Object.keys(trackImage);

    keys.forEach((key) => {
      center(trackImage[key], centerDiv);
    });

    scrollAnimation(
      scrollContainer,
      imagesArr,
      newPercentage,
      newImagePercentage
    );
  };

  window.onmousedown = (e) => {
    mousedown = e.clientY;
  };

  window.onmouseup = (e) => {
    mousedown = 0;
    oldPercentage = currPercentage;
  };
}

function scrollAnimation(
  scrollContainer,
  imagesArr,
  newPercentage,
  imagePercentage
) {
  scrollContainer.animate(
    {
      transform: `translate(-50%,${newPercentage}%)`,
    },
    { duration: 1000, fill: "forwards" }
  );
  imagesArr.forEach((image) => {
    image.animate(
      {
        transform: `translate(-50%,${imagePercentage}%)`,
      },
      { duration: 1000, fill: "forwards" }
    );
  });
}

function moveToCenter(
  elementCenter,
  center,
  scrollHeight,
  scrollContainer,
  percent,
  imagesArr
) {
  const distance = center - elementCenter;
  const distancePercent = (distance / scrollHeight) * 100;
  const calcPercent = distancePercent + percent;
  const newImagePercentage = (calcPercent / 100) * 0.8 * -33.3;

  scrollContainer.animate(
    {
      transform: `translate(-50%,${calcPercent}%)`,
    },
    { duration: 300, fill: "forwards" }
  );
  imagesArr.forEach((image) => {
    image.animate(
      {
        transform: `translate(-50%,${newImagePercentage}%)`,
      },
      { duration: 1000, fill: "forwards" }
    );
  });

  return calcPercent;
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
