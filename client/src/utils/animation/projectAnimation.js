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
    if (index) timedelay = "-=.4";
    if (parseInt(position.dataset.position) % 2 === 0) {
      tl.from(
        `#${position.id}`,
        { x: -600, opacity: 0, duration: 0.5 },
        timedelay
      );
    } else {
      tl.from(
        `#${position.id}`,
        { x: 600, opacity: 0, duration: 0.5 },
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

    // gsap.to(`#${element.id}`, {
    //   y: -200,
    //   opacity: 0,
    //   duration: 0.2,
    //   onComplete: () => {
    //     element.style = {};
    //     resolve();
    //   },
    // });
  });
}

// function
export const projectAnimation = {
  showProject,
  hideProject,
};
