import gsap from "gsap";

// need to accept moving element and timeline
function defaultShow(element, tl) {
  tl.from(`#${element.id}`, { x: 200, direction: 1 });
}

function defaultHide(element, tl) {
  console.log("hiding:", element);
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
