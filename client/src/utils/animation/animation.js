import gsap from "gsap";

// need to accept moving element and timeline
function defaultShow(element) {
  console.log("showing:", element);
}

function defaultHide(element) {
  console.log("hiding:", element);
}

export const animation = {
  defaultShow,
  defaultHide,
};
