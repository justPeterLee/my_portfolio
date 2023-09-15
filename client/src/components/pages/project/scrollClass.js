import { gsap, Power2 } from "gsap";
import { scrollDescription } from "./renderProject";
import {
  focusImage,
  unfocusImage,
  showDescription,
  hideDescription,
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
          this.moveTo(e);
        }
      });

      image.addEventListener("mouseover", (e) => {
        const position = e.target.dataset.position;
        const tri = document.querySelector(`#image-triangle-${position}`);
        if (!tri || this.mouseMove || this.isFocus) return;

        gsap.to(`#${tri.id}`, {
          duration: 0.2,
          right: tri.dataset.side ? 20 : -20,
        });
      });

      image.addEventListener("mouseout", (e) => {
        const position = e.target.dataset.position;
        const tri = document.querySelector(`#image-triangle-${position}`);
        if (!tri) return;

        gsap.to(`#${tri.id}`, { duration: 0.2, right: 0 });
      });
    });

    this._moveActive = false;
    this._mouseMove = false;
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
        duration: 0.5,
        fill: "forwards",
        ease: Power2.easeOut,
        transform: `translate(-50%,${newPercentage}%)`,
        onUpdate: () => {
          if (isManual) {
            this.imageAnimation();
          }
          this.centerDetect();
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  imageParallax(newPercentage, element) {
    // const from = a || "none";
    // console.log(newPercentage, from);
    // this._images.forEach((element) => {
    gsap.to(`#${element.id}`, {
      duration: 0.5,
      objectPosition: `center ${newPercentage}%`,
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
        }
      }
    });
  }

  moveTo(e) {
    if (this.moveActive && this.mouseMove && this.isFocus) {
    } else {
      this.moveActive = true;
      const element = e.target.parentNode;
      const elementPos = element.getBoundingClientRect();
      const elementCenter = elementPos.top + elementPos.height / 2;

      //   console.log(elementPos.height);
      const centerPos = this._center.getBoundingClientRect();
      const centerCenter = centerPos.top + centerPos.height / 2;

      const scrollHeight = this._scrollContainer.getBoundingClientRect().height;
      const distance = centerCenter - elementCenter;
      const distancePercent = (distance / scrollHeight) * 100;

      // console.log(distancePercent);

      this.scrollPercent(distancePercent);

      this.scrollAnimation(this.percent, true).then(() => {
        this.moveActive = false;
        this.cachePercent();
        showDescription(this.whoFocus);
      });

      console.log("moved");

      this.whoFocus = { parent: e.target.parentNode, image: e.target };
      this.isFocus = true;

      focusImage(this.whoFocus, this._images);
    }
  }

  scrollUp() {
    // this.scrollPercent(-5);
    this.percent -= 5;

    if (this.percent < -100) {
      this.percent = -99.9;
    }

    this._currPercent = this.percent;
    this.defaultImageAnimation();
    this.scrollAnimation(this.percent);
  }

  scrollDown() {
    // this.scrollPercent(10);
    this.percent += 5;

    if (this.percent > 0) {
      this.percent = -0.9;
    }

    this._currPercent = this.percent;
    this.defaultImageAnimation();
    this.scrollAnimation(this.percent);
  }

  imagePercentage(image) {
    const imagePos = image.getBoundingClientRect();
    const imageCenter = imagePos.top + imagePos.height / 2;
    // console.log(imageCenter);

    const centerPos = this._center.getBoundingClientRect();
    const centerCenter = centerPos.top + centerPos.height / 2;

    const distance = centerCenter - imageCenter;

    const scrollHeight = this._scrollContainer.getBoundingClientRect().height;
    const distancePercent = (distance / scrollHeight) * 100;

    const ratioPercent = distancePercent + 50;

    // console.log(ratioPercent);

    let imagePercent;

    if (ratioPercent <= 100 && ratioPercent >= 0) {
      imagePercent = ratioPercent;
    }

    if (imagePercent < 0 || ratioPercent < 0) {
      imagePercent = 0.1;
    }
    if (imagePercent > 100 || ratioPercent > 100) {
      imagePercent = 99.9;
    }

    return imagePercent;
    // this.imageParallax(imagePercent, "checker");
  }

  imageAnimation() {
    this.images.forEach((element) => {
      let imagePercent = this.imagePercentage(element);
      this.imageParallax(imagePercent, element);
    });
  }

  defaultImageAnimation() {
    this.images.forEach((element) => {
      this.imageParallax(this.percent + 100, element);
    });
  }

  unFocus() {
    unfocusImage(this.whoFocus, this._images);
    hideDescription(this.whoFocus);
    this.whoFocus = {};
    this.isFocus = false;
  }

  generateDescription(parent) {
    scrollDescription(parent);
  }
}
