import gsap from "gsap";
import { display } from "../../global/Display";
// need to accept moving element and timeline
const tl = display.timeline;
function defaultShow(element) {
  tl.from(`#${element.id}`, {
    x: 200,
    direction: 1,
    onStart: () => {
      element.style = {};
      // element.style.display = "none";
    },
  });
}

function defaultHide(element) {
  tl.to(`#${element.id}`, {
    y: -200,
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      element.style = {};
      // element.style.display = "none";
    },
  });
}

export const animation = {
  defaultShow,
  defaultHide,
};
