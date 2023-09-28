import { gsap } from "gsap/gsap-core";
import { Power1 } from "gsap";
export function showContent() {
  gsap.to(
    ".letter-words, .contact-button",
    { y: 0, duration: 0.4, stagger: 0.075, ease: Power1.easeOut }
    // "-=.1"
  );
  // gsap.to('.contact-button', {y})
}

export function hideContent() {
  return new Promise((resolve, reject) => {
    gsap.to(
      ".letter-words, .contact-button",
      {
        y: 32,
        duration: 0.4,
        stagger: 0.075,
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
    display: "flex",
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
