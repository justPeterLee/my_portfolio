import gsap from "gsap";

function menuOrigin() {
  gsap.to("#nav-menu-container", { x: 200, duration: 1 });
}

function test() {
  gsap.to("#contact-renderer-container", { x: 200, duration: 1 });
}
export const menuAnimation = {
  menuOrigin,
  test,
};
