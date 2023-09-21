import { gsap } from "gsap";

function showProject(element) {
  // even - right
  // odd - left

  const tl = gsap.timeline();
  const elementChild = [...element.children];
  const animationArr = elementChild.map((grandElement) => {
    return grandElement.children[0];
  });

  animationArr.forEach((position, index) => {
    // console.log(index);
    let timedelay;
    if (index) timedelay = "-=.2";
    if (parseInt(position.dataset.position) % 2 === 0) {
      tl.from(
        `#${position.id}`,
        { x: -600, opacity: 0, duration: 0.3 },
        timedelay
      );
    } else {
      tl.from(
        `#${position.id}`,
        { x: 600, opacity: 0, duration: 0.3 },
        timedelay
      );
    }
  });
}

function hideProject(element) {
  return new Promise((resolve, reject) => {
    const tl = gsap.timeline();
    const children = [...element.children];
    const center = document.querySelector("#centerDiv");

    if (center) {
      gsap.to(`#${center.id}`, {
        duration: 0,
        onComplete: () => {
          center.remove();
        },
      });
    }

    children.forEach((component, index) => {
      //   console.log(component);
      let timedelay;
      if (index) timedelay = "-=.3";
      tl.to(
        `#${component.id}`,
        {
          x: 600,
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            if (index + 1 === children.length) {
              element.style = {};
              resolve();
            }
          },
        },
        timedelay
      );
    });
  });
}

const showTL = gsap.timeline();
const hideTL = gsap.timeline();
export function focusProject(selected) {
  const selectedId = selected.parent.dataset.position;

  const animationContainer = selected.parent.querySelector(
    `#animation-text-container-${selectedId}`
  );
  const descriptionContainer = selected.parent.querySelector(
    `#description-container-${selectedId}`
  );
  const description = selected.parent.querySelector(
    `#description-container-${selectedId}`
  );

  const images = gsap.utils
    .toArray(".animation-container")
    .filter((element) => {
      if (element.dataset.position !== selectedId) return element;
    });

  showTL.to(images, { opacity: 0, duration: 0.3 });

  showTL.to(`#${selected.image.id}`, {
    height: "55rem",
    duration: 0.5,
  });

  // move title
  const titleDem = animationContainer.getBoundingClientRect();
  const descriptionDem = descriptionContainer.getBoundingClientRect();

  const vertical =
    (descriptionDem.width / 2 / titleDem.width -
      titleDem.width / 2 / titleDem.width) *
    100;

  const direction = parseInt(selectedId) % 2 === 0 ? -1 * vertical : vertical;

  showTL.to(`#${animationContainer.id}`, {
    translateY: "-100%",
    translateX: `${direction}`,
    duration: 0.5,
  });

  // show description
  const text = gsap.utils.toArray(description.getElementsByClassName("text"));

  showTL.from(text, {
    y: 20,
    duration: 0.5,
    stagger: 0.05,
    onStart: () => {
      text.forEach((element) => {
        element.style.opacity = "100%";
      });
    },
  });
}

export function blurProject(selected) {
  const selectedId = selected.parent.dataset.position;

  const animationContainer = selected.parent.querySelector(
    `#animation-text-container-${selectedId}`
  );

  const description = selected.parent.querySelector(
    `#description-container-${selectedId}`
  );

  // image reveal
  const images = gsap.utils
    .toArray(".animation-container")
    .filter((element) => {
      if (element.dataset.position !== selectedId) return element;
    });

  hideTL.to(images, { opacity: 1, duration: 1, stagger: 0.2 });

  // resize focused image
  hideTL.to(`#${selected.image.id}`, {
    height: "20rem",
    duration: 0.55,
  });

  // move title
  hideTL.to(`#${animationContainer.id}`, {
    translateX: `0%`,
    translateY: `0%`,
    duration: 0.4,
  });

  // hide description
  const target = gsap.utils.toArray(description.getElementsByClassName("text"));

  hideTL.to(target, {
    opacity: 0,
    duration: 0.3,
    stagger: 0.05,
  });
}

// function
export const projectAnimation = {
  showProject,
  hideProject,
};
