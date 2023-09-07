import gsap from "gsap";

function menuOrigin(initial) {
  const initialDur = initial ? 0 : 0.3;
  gsap.to("#nav-menu-hover-container", {
    x: 0,
    y: 0,
    duration: initialDur,
    // ease: "elastic.out(1,.9)",
  });
}

function menuSide(initial) {
  const initialDur = initial ? 0 : 0.3;
  gsap.to("#nav-menu-hover-container", {
    x: -500,
    y: -300,
    duration: initialDur,
    // ease: "elastic.out(1,.9)",
  });
}

export const menuAnimation = {
  menuOrigin,
  menuSide,
};
