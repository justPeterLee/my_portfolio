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
    console.log(timedelay);
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
  const tl = gsap.timeline();
  const elementChild = [...element.children];
  const animationArr = elementChild.map((grandElement) => {
    return grandElement.children[0];
  });

  animationArr.forEach((position, index) => {
    // console.log(index);
    let timedelay;
    // console.log(timedelay);
    if (index) timedelay = "-=.6";
    if (parseInt(position.dataset.position) % 2 === 0) {
      tl.to(
        `#${position.id}`,
        { x: 600, opacity: 0, duration: 0.7 },
        timedelay
      );
    } else {
      tl.to(
        `#${position.id}`,
        { x: -600, opacity: 0, duration: 0.7 },
        timedelay
      );
    }
  });
}

export const projectAnimation = {
  showProject,
  hideProject,
};
