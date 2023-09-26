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
        duration: 0.2,
        stagger: 0.035,
        onComplete: () => {
          resolve();
        },
      },
      "-=.1"
    );
  });
}

export const contactAnimation = {
  showContent,
  hideContent,
};
