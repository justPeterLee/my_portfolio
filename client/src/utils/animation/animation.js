import gsap from "gsap";
import { display } from "../../global/Display";
// need to accept moving element and timeline
const tl = display.timeline;
function defaultShow(element) {
  tl.from(`#${element.id}`, { x: 200, direction: 1 });
}

function defaultHide(element) {
  tl.to(`#${element.id}`, {
    y: 200,
    direction: 1,
    OnComplete: () => {
      element.style.display = "none";
    },
  });
}

export const animation = {
  defaultShow,
  defaultHide,
};
