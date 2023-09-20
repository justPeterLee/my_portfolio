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

const pageTL = gsap.timeline();
export function focusProject(selected, imageArr) {
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

  imageArr.forEach((element) => {
    if (element.parentNode.dataset.position !== selectedId) {
      pageTL.to(`#${element.parentNode.id}`, { opacity: 0, duration: 0.3 });
    }
  });

  pageTL.to(`#${selected.image.id}`, {
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

  pageTL.to(`#${animationContainer.id}`, {
    translateY: "-100%",
    translateX: `${direction}`,
    duration: 0.5,
  });

  // show description
  const text = [...description.getElementsByClassName("text")];

  text.forEach((element, index) => {
    let timedelay;
    if (index) timedelay = "-=.45";
    pageTL.from(
      `#${element.id}`,
      {
        y: 20,
        duration: 0.5,
        onStart: () => {
          element.style.opacity = "100%";
        },
      },
      timedelay
    );
  });
}

export function focusImage(selected, imageArr) {
  // get all
  // get choosen
  return new Promise((resolve, reject) => {
    const selectedId = selected.parent.dataset.position;

    imageArr.forEach((element) => {
      if (element.parentNode.dataset.position !== selectedId) {
        gsap.to(`#${element.parentNode.id}`, { opacity: 0, duration: 0.3 });
      }
    });

    gsap.to(`#${selected.image.id}`, {
      height: "55rem",
      duration: 0.5,
      onComplete: () => {
        // console.log("image resize COMPLETE");
        resolve();
      },
    });
  });
}

export function blurProject(selected, imageArr) {
  const selectedId = selected.parent.dataset.position;

  const animationContainer = selected.parent.querySelector(
    `#animation-text-container-${selectedId}`
  );

  const description = selected.parent.querySelector(
    `#description-container-${selectedId}`
  );

  imageArr.forEach((element) => {
    if (element.parentNode.dataset.position !== selectedId) {
      pageTL.to(`#${element.parentNode.id}`, { opacity: 1, duration: 1 });
    }
  });

  pageTL.to(`#${selected.image.id}`, {
    height: "20rem",
    duration: 0.55,
  });

  // move title
  pageTL.to(`#${animationContainer.id}`, {
    translateX: `0%`,
    translateY: `0%`,
    duration: 0.4,
  });

  // hide description
  const text = [...description.getElementsByClassName("text")];

  text.forEach((element) => {
    pageTL.to(`#${element.id}`, {
      opacity: 0,
      duration: 0.3,
    });
  });
}

export function unfocusImage(selected, imageArr) {
  return new Promise((resolve, reject) => {
    const selectedId = selected.parent.dataset.position;

    imageArr.forEach((element) => {
      if (element.parentNode.dataset.position !== selectedId) {
        gsap.to(`#${element.parentNode.id}`, { opacity: 1, duration: 1 });
      }
    });

    gsap.to(`#${selected.image.id}`, {
      height: "20rem",
      duration: 0.55,
      onComplete: () => {
        resolve();
      },
    });
  });
}

export function showDescription(selected) {
  const tl = gsap.timeline();

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

  // move title
  const titleDem = animationContainer.getBoundingClientRect();
  const descriptionDem = descriptionContainer.getBoundingClientRect();

  const vertical =
    (descriptionDem.width / 2 / titleDem.width -
      titleDem.width / 2 / titleDem.width) *
    100;

  const direction = parseInt(selectedId) % 2 === 0 ? -1 * vertical : vertical;

  tl.to(`#${animationContainer.id}`, {
    translateY: "-100%",
    translateX: `${direction}`,
    duration: 0.5,
    // onComplete: () => {
    //   console.log("title move COMPLETE");
    // },
  });

  // show description
  const text = [...description.getElementsByClassName("text")];

  text.forEach((element, index) => {
    let timedelay;
    if (index) timedelay = "-=.45";
    tl.from(
      `#${element.id}`,
      {
        y: 20,
        duration: 0.5,
        onStart: () => {
          element.style.opacity = "100%";
        },
        // onComplete: () => {
        //   if (index + 1 === text.length) {
        //     console.log("description move COMPLETE");
        //     console.timeEnd("animation");
        //   }
        // },
      },
      timedelay
    );
  });
}

export function hideDescription(selected) {
  const selectedId = selected.parent.dataset.position;

  const animationContainer = selected.parent.querySelector(
    `#animation-text-container-${selectedId}`
  );

  const description = selected.parent.querySelector(
    `#description-container-${selectedId}`
  );

  // move title
  gsap.to(`#${animationContainer.id}`, {
    translateX: `0%`,
    translateY: `0%`,
    duration: 0.4,
  });

  // hide description
  const text = [...description.getElementsByClassName("text")];

  text.forEach((element) => {
    gsap.to(`#${element.id}`, {
      opacity: 0,
      duration: 0.3,
    });
  });
}
// function
export const projectAnimation = {
  showProject,
  hideProject,
};
