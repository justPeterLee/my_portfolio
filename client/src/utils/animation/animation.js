import gsap from "gsap";

// need to accept moving element and timeline
function defaultShow(element) {
  console.log("showing:", element.id);
  gsap.from(`#${element.id}`, { x: 200, direction: 1 });
}

function defaultHide(element) {
  console.log("hiding:", element);
}

export const animation = {
  defaultShow,
  defaultHide,
};
