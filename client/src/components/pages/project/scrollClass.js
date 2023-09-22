import { gsap } from "gsap";
import {
  focusProject,
  blurProject,
} from "../../../utils/animation/projectAnimation";
export class projectScroll {
  constructor(scrollContainer, center, images) {
    this._scrollContainer = scrollContainer;
    this._center = center;
    this._images = images;

    this._oldPercent = 0;
    this._currPercent = 0;
    this._percent = 0;
    this._imagePercent = 0;
    this._isCenter = null;

    this._isFocus = false;
    this._whoFocus = null;
    // this._isInitial = true;

    this._images.forEach((image) => {
      image.addEventListener("click", (e) => {
        if (!this._mouseMove && !this.isFocus) {
          this.focus(e);
        }
      });

      image.addEventListener("mouseover", (e) => {
        const position = e.target.dataset.position;
        this.triAnimation(position, "show");
      });

      image.addEventListener("mouseout", (e) => {
        const position = e.target.dataset.position;
        this.triAnimation(position, "hide");
      });
    });

    this._moveActive = false;
    this._mouseMove = false;
    this._scrollCount = 0;
  }

  get images() {
    return this._images;
  }

  get percent() {
    return this._percent;
  }

  set percent(newPercent) {
    this._percent = newPercent;
  }

  get imagePercent() {
    return this._imagePercent;
  }

  set imagePercent(newPercent) {
    this._imagePercent = newPercent;
  }

  get isCenter() {
    return this._isCenter;
  }

  set isCenter(newCenter) {
    this._isCenter = newCenter;
  }

  get moveActive() {
    return this._moveActive;
  }

  set moveActive(bool) {
    this._moveActive = bool;
  }

  get mouseMove() {
    return this._mouseMove;
  }

  set mouseMove(bool) {
    this._mouseMove = bool;
  }

  get isFocus() {
    return this._isFocus;
  }

  set isFocus(bool) {
    this._isFocus = bool;
  }

  get whoFocus() {
    return this._whoFocus;
  }

  set whoFocus(element) {
    this._whoFocus = element;
  }

  initialCenter() {
    const height = this._scrollContainer.getBoundingClientRect().height;
    console.log(height);
  }

  cachePercent() {
    this._oldPercent = this._currPercent;
  }

  scrollPercent(newPercent) {
    const totalPercent = this._oldPercent + newPercent;

    if (totalPercent >= -100 && totalPercent <= 0) {
      this.percent = totalPercent;
    }

    if (totalPercent < -100) {
      this.percent = -99.9;
    }

    if (totalPercent > 0) {
      this.percent = -0.1;
    }

    this._currPercent = this.percent;
  }

  scrollAnimation(newPercentage, manual) {
    return new Promise((resolve, reject) => {
      const isManual = manual || false;
      gsap.to(`#${this._scrollContainer.id}`, {
        // transform: `translate(-50%,${newPercentage}%)`,
        // translateY: `${newPercentage}%`,
        y: `${newPercentage}%`,
        onUpdate: () => {
          if (isManual) {
            // let imagePercent = this.imagePercentage(manual);
            // this.imageParallax(imagePercent, manual);
          }
          this.centerDetect();
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  imageParallax(newPercentage) {
    gsap.to(this.images, {
      objectPosition: `center ${newPercentage}%`,
    });
  }

  imageParallaxCenter(element) {
    gsap.to(`#${element.id}`, {
      objectPosition: `center ${50}%`,
    });
  }
  centerDetect() {
    const centerPos = this._center.getBoundingClientRect();
    this._images.forEach((image) => {
      const elementPos = image.getBoundingClientRect();
      const areTouching = !(
        elementPos.right < centerPos.left ||
        elementPos.left > centerPos.right ||
        elementPos.bottom < centerPos.top ||
        elementPos.top > centerPos.bottom
      );

      if (areTouching) {
        if (this.isCenter !== image.dataset.position) {
          this.isCenter = image.dataset.position;
          this._center.innerHTML = this.isCenter;
        }
      }
    });
  }

  focus(e) {
    if (this.moveActive && this.mouseMove && this.isFocus) return;
    this.triAnimation(e.target.dataset.position, "hide");
    this.moveActive = true;
    const element = e.target.parentNode;
    const elementPos = element.getBoundingClientRect();
    const elementCenter = elementPos.top + elementPos.height / 2;

    const centerPos = this._center.getBoundingClientRect();
    const centerCenter = centerPos.top + centerPos.height / 2;

    const scrollHeight = this._scrollContainer.getBoundingClientRect().height;
    const distance = centerCenter - elementCenter;
    const distancePercent = (distance / scrollHeight) * 100;

    this.scrollPercent(distancePercent);

    this.scrollAnimation(this.percent, e.target).then(() => {
      this.moveActive = false;
      this.cachePercent();
    });

    // let imagePercent = this.imagePercentage(e.target, distancePercent);
    this.imageParallaxCenter(e.target);

    this.whoFocus = { parent: e.target.parentNode, image: e.target };
    this.isFocus = true;

    focusProject(this.whoFocus);
  }

  unFocus() {
    blurProject(this.whoFocus);
    this.whoFocus = {};
    this.isFocus = false;
    this._scrollCount = 0;
  }

  scrollUp() {
    if (!this.isFocus) {
      this.percent -= 5;

      if (this.percent < -100) {
        this.percent = -99.9;
      }

      this._currPercent = this.percent;
      this.imageParallax(this.percent + 100);
      this.scrollAnimation(this.percent);
    } else {
      this._scrollCount -= 1;

      if (this._scrollCount <= -6 || this._scrollCount >= 6) {
        this.unFocus();
      }
    }
  }

  scrollDown() {
    if (!this.isFocus) {
      this.percent += 5;

      if (this.percent > 0) {
        this.percent = -0.9;
      }

      this._currPercent = this.percent;
      this.imageParallax(this.percent + 100);
      this.scrollAnimation(this.percent);
    } else {
      this._scrollCount -= 1;
      if (this._scrollCount <= -6 || this._scrollCount >= 6) {
        this.unFocus();
      }
    }
  }

  triAnimation(position, state) {
    const tri = document.querySelector(`#image-triangle-${position}`);

    if (state === "show") {
      if (!tri || this.mouseMove || this.isFocus) return;

      gsap.to(`#${tri.id}`, {
        duration: 0.2,
        x: tri.dataset.side ? -20 : 20,
      });
    } else if (state === "hide") {
      if (!tri) return;

      gsap.to(`#${tri.id}`, { duration: 0.2, x: 0 });
    } else return;
  }

  // imagePercentage(image, offset) {
  //   console.log(offset);
  //   const imagePos = image.getBoundingClientRect();
  //   const imageCenter = imagePos.top + imagePos.height / 2;

  //   const centerPos = this._center.getBoundingClientRect();
  //   const centerCenter = centerPos.top + centerPos.height / 2;

  //   const distance = centerCenter - imageCenter;

  //   const scrollHeight = this._scrollContainer.getBoundingClientRect().height;
  //   const distancePercent = (distance / scrollHeight) * 100;

  //   const ratioPercent = distancePercent + 50 + offset;

  //   let imagePercent;

  //   if (ratioPercent <= 100 && ratioPercent >= 0) {
  //     imagePercent = ratioPercent;
  //   }

  //   if (imagePercent < 0 || ratioPercent < 0) {
  //     imagePercent = 0.1;
  //   }
  //   if (imagePercent > 100 || ratioPercent > 100) {
  //     imagePercent = 99.9;
  //   }

  //   return imagePercent;
  // }
}
