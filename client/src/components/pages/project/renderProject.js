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
  const imagesArr = [];
  keys.forEach((project, index) => {
    console.log(data[project].title);
    console.log(index);
    // span (main container for project instance)
    const projectContainer = document.createElement("span");
    projectContainer.className = "container project-display-container";
    projectContainer.id = `project-display-${index}`;
    projectContainer.dataset.position = index;
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

      projectContainer.appendChild(imageDot);
      projectContainer.appendChild(imageContainer);
    } else {
      imageDot.style.transform = "rotate(270deg)";

      projectContainer.prepend(imageDot);
      projectContainer.prepend(imageContainer);
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
  let imagePercentage = 0;
  console.log(imagesArr);
  const body = document.querySelector("body");

  body.addEventListener("wheel", (event) => {
    const deltaY = event.deltaY;
    // Perform actions based on the scroll input
    if (deltaY > 0) {
      // Add your code for scrolling down
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

    currPercentage = newPercentage;

    if (imagePercentage >= -15 && imagePercentage <= 0) {
      imagePercentage = ((newPercentage * 3) / 100) * -15 + -15;
    }

    if (imagePercentage <= -15) {
      imagePercentage = -14.9;
    }
    if (imagePercentage >= 0) {
      imagePercentage = -0.1;
    }

    console.log(imagePercentage);
    scrollAnimation(scrollContainer, imagesArr, newPercentage, imagePercentage);
  });

  window.onmousemove = (e) => {
    if (mousedown === 0) return;

    const mouseDelta = (parseFloat(mousedown) - e.clientY) * 0.5;
    const maxDelta = window.innerHeight / 2;

    const percentage = (mouseDelta / maxDelta) * -100;

    if (newPercentage >= -100 && newPercentage <= 1) {
      newPercentage = oldPercentage + percentage;
    }
    if (newPercentage < -100) {
      newPercentage = -99.9;
    }
    if (newPercentage > 1) {
      newPercentage = 0.9;
    }

    currPercentage = newPercentage;

    if (imagePercentage >= -15 && imagePercentage <= 0) {
      imagePercentage = ((newPercentage * 2) / 100) * -15 + -15;
    }

    if (imagePercentage <= -15) {
      imagePercentage = -14.9;
    }
    if (imagePercentage >= 0) {
      imagePercentage = -0.1;
    }
    scrollAnimation(scrollContainer, imagesArr, newPercentage, imagePercentage);
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
    { duration: 500, fill: "forwards" }
  );
  imagesArr.forEach((image) => {
    image.animate(
      {
        transform: `translate(-50%,${imagePercentage}%)`,
      },
      { duration: 500, fill: "forwards" }
    );
  });
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
