import gsap from "gsap";
// need to accept moving element and timeline
const tl = gsap.timeline();
function defaultShow(element) {
  tl.from(`#${element.id}`, {
    x: 200,
    opacity: 0,
    direction: 1,
    onStart: () => {
      element.style = {};
      element.parentElement.style.display = {};
    },
  });
}

function defaultHide(element) {
  tl.to(`#${element.id}`, {
    y: -200,
    opacity: 0,
    duration: 0.5,
    onStart: () => {
      console.log("START");
    },
    onComplete: () => {
      element.style = {};
      // console.log(element.parentElement.nodeName);
      element.parentElement.style.display = "none";
      // element.style.opacity = "100%";
      console.log("end");
    },
  });
}

export const animation = {
  defaultShow,
  defaultHide,
};
