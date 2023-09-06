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
      // onStart: () => {
      //   element.style = {};
      //   element.parentElement.style.display = {};
      // },
    },
    label
  );
}

function defaultHide(element) {
  globalTL.to(`#${element.id}`, {
    y: -200,
    opacity: 0,
    duration: 0.5,
    // onStart: () => {
    //   console.log("START");
    // },
    // onComplete: () => {
    //   element.style = {};
    //   // console.log(element.parentElement.nodeName);
    //   element.parentElement.style.display = "none";
    //   // element.style.opacity = "100%";
    //   console.log("end");
    // },
  });
}

export const animation = {
  defaultShow,
  defaultHide,
};
