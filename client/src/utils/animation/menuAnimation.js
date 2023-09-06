import gsap from "gsap";

function menuOrigin(initial) {
  const initialDur = initial ? 0 : 0.4;
  gsap.to("#nav-menu-hover-container", {
    x: 0,
    y: 0,
    duration: initialDur,
    // ease: "elastic.out(1,.9)",
  });
}

function menuSide(initial) {
  const initialDur = initial ? 0 : 0.4;
  gsap.to("#nav-menu-hover-container", {
    x: -400,
    y: -200,
    duration: initialDur,
    // ease: "elastic.out(1,.9)",
  });
}

export const menuAnimation = {
  menuOrigin,
  menuSide,
};
