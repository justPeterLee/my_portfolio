import { gsap } from "gsap/gsap-core";
import { Power1 } from "gsap";
export function showContent() {
  gsap.to(
    ".letter-words",
    { y: 0, duration: 0.4, stagger: 0.075, ease: Power1.easeOut }
    // "-=.1"
  );
}

export function hideContent() {
  return new Promise((resolve, reject) => {
    gsap.to(
      ".letter-words",
      {
        y: 25,
        duration: 0.3,
        stagger: 0.035,
        onComplete: () => {
          resolve();
        },
      },
      "-=.1"
    );
  });
}

const noteTL = gsap.timeline();

export function showNote() {
  noteTL.to("#ps-container", {
    display: "inline",
    duration: 0,
  });
}

export function hideNote() {
  noteTL.to("#ps-container", { display: "none", duration: 0 });
}

export const contactAnimation = {
  showContent,
  hideContent,
  showNote,
  hideNote,
};
