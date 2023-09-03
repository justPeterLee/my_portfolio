import gsap from "gsap";

function menuOrigin(initial) {
  const initialDur = initial ? 0 : 1;
  gsap.to("#nav-menu-hover-container", { x: 200, duration: initialDur });
}

function menuSide(initial) {
  const initialDur = initial ? 0 : 1;
  gsap.to("#nav-menu-hover-container", {
    x: -400,
    y: -200,
    duration: initialDur,
  });
}

export const menuAnimation = {
  menuOrigin,
  menuSide,
};
