import data from "../../../../public/projects.json";
import "./project.css";
// default view
export function scrollContainer() {
  console.log(data);
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
    animationContainer.className = "animation-container";
    animationContainer.id = `animation-container-${index}`;
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

    const image = document.createElement("img");
    image.dataset.position = index;
    image.id = "image";
    image.className = "image";
    image.src = data[project].image;
    imageContainer.appendChild(image);

    imagesArr.push(image);
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

  scrollEvent(scrollContainer, imagesArr);
  // parallaxImage(scrollContainer);
  return scrollContainer;
}

function scrollEvent(scrollContainer, imagesArr) {
  let mousedown = 0;
  let oldPercentage = 0;
  let currPercentage = 0;
  let newPercentage = 0;

  let newImagePercentage = 0;
  let trackImage = {};
  let scrollingStoppedTimeout;

  const body = document.querySelector("body");

  window.addEventListener("resize", () => {
    // console.log(window.innerHeight);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(window.innerHeight / 2);
        console.log(entry);
      }
    });
  });

  observer.observe(imagesArr[0]);

  imagesArr.forEach((element) => {
    observer.observe(element);
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
      if (newPercentage >= -100) {
        newPercentage -= 5;
      }
    } else if (deltaY < 0) {
      if (newPercentage <= 1) {
        newPercentage += 5;
      }
    }
    if (newPercentage < -100) {
      newPercentage = -99.9;
    }
    if (newPercentage > 1) {
      newPercentage = 0.9;
    }

    // track percent
    currPercentage = newPercentage;

    newImagePercentage = (newPercentage / 100) * 0.5 * 66.6;

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

    if (newPercentage >= -100 && newPercentage <= 1) {
      newPercentage = oldPercentage + percentage;
    }
    if (newPercentage < -100) {
      newPercentage = -99.9;
    }
    if (newPercentage > 1) {
      newPercentage = 0;
    }

    currPercentage = newPercentage;

    newImagePercentage = (newPercentage / 100) * 0.8 * -33.3;

    console.log(newPercentage);

    scrollAnimation(
      scrollContainer,
      imagesArr,
      newPercentage,
      newImagePercentage
    );

    // imagesArr.forEach((element) => {
    //   imagePosition(element);
    // });
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

// node position

function imagePosition(image) {
  const position = image.getBoundingClientRect();
  console.log(position);
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
