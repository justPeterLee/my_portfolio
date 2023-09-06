import gsap from "gsap";
import { display } from "../../global/Display";
// need to accept moving element and timeline

const globalTL = display.timeline;

function defaultShow(element, timeline) {
  let tl;
  let label = "0";

  if (timeline) {
    tl = gsap.timeline();
    label = ">";
  } else {
    tl = display.timeline;
    label = "0";
  }

  tl.from(
    `#${element.id}`,
    {
      x: 200,
      opacity: 0,
      direction: 1,
      onStart: () => {
        element.style = {};
        // element.parentElement.style.display = {};
      },
    },
    label
  );
}

function defaultHide(element, timeline) {
  return new Promise((resolve, reject) => {
    let tl;
    let label = "0";

    if (timeline) {
      tl = gsap.timeline();
      label = ">";
    } else {
      tl = display.timeline;
      label = "0";
    }

    globalTL.to(`#${element.id}`, {
      y: -200,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        resolve();
      },
    });
  });
}

export const animation = {
  defaultShow,
  defaultHide,
};
