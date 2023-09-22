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

export const showTL = gsap.timeline();
export const hideTL = gsap.timeline();

export function focusProject(selected) {
  // animation elements
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

  // labels
  showTL.addLabel("instant", "+=0");

  // outer images
  const images = gsap.utils
    .toArray(".animation-container")
    .filter((element) => {
      if (element.dataset.position !== selectedId) return element;
    });

  showTL.to(images, { opacity: 0, duration: 0.3 });

  // main image
  showTL.to(
    `#${selected.image.id}`,
    {
      height: "55rem",
      duration: 0.5,
    },
    "instant"
  );

  // move title
  const titleDem = animationContainer.getBoundingClientRect();
  const descriptionDem = descriptionContainer.getBoundingClientRect();

  const vertical =
    (descriptionDem.width / 2 / titleDem.width -
      titleDem.width / 2 / titleDem.width) *
    100;

  const direction = parseInt(selectedId) % 2 === 0 ? -1 * vertical : vertical;

  showTL.to(
    `#${animationContainer.id}`,
    {
      translateY: "-100%",
      translateX: `${direction}`,
      duration: 0.5,
    },
    // "-=.2"
    "instant"
  );

  // show description
  const text = gsap.utils.toArray(description.getElementsByClassName("text"));

  showTL.from(
    text,
    {
      y: 40,
      duration: 0.4,
      stagger: 0.05,
      onStart: () => {
        text.forEach((element) => {
          element.style.opacity = "100%";
        });
      },
    },
    "-=.15"
  );
}

export function blurProject(selected) {
  // if (showTL.progress() < 0.4) return;
  // animated elements
  const selectedId = selected.parent.dataset.position;

  const animationContainer = selected.parent.querySelector(
    `#animation-text-container-${selectedId}`
  );

  const description = selected.parent.querySelector(
    `#description-container-${selectedId}`
  );

  // labels
  hideTL.addLabel("instant", "+=0");

  // image reveal
  const images = gsap.utils
    .toArray(".animation-container")
    .filter((element) => {
      if (element.dataset.position !== selectedId) return element;
    });

  hideTL.to(images, { opacity: 1, duration: 0.5 });

  // resize focused image
  hideTL.to(
    `#${selected.image.id}`,
    {
      height: "20rem",
      duration: 0.5,
    },
    "instant"
  );

  // move title
  hideTL.to(
    `#${animationContainer.id}`,
    {
      translateX: `0%`,
      translateY: `0%`,
      duration: 0.4,
    },
    "instant"
  );

  // hide description
  const target = gsap.utils.toArray(description.getElementsByClassName("text"));

  hideTL.to(
    target,
    {
      opacity: 0,
      duration: 0.3,
    },
    "instant"
  );
}

// function
export const projectAnimation = {
  showProject,
  hideProject,
};
