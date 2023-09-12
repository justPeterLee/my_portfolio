import { gsap, Power2 } from "gsap";
export class projectScroll {
  constructor(scrollContainer, center, images, imageContainers) {
    this._scrollContainer = scrollContainer;
    this._center = center;
    this._images = images;
    this._imageContainers = imageContainers;

    this._oldPercent = 0;
    this._currPercent = 0;
    this._percent = 0;
    this._imagePercent = 0;
    this._isCenter = null;

    this._imageContainers.forEach((image) => {
      image.addEventListener("click", (e) => {
        this.moveTo(e);
      });
    });

    this._moveActive = false;
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

  scrollAnimation(newPercentage) {
    return new Promise((resolve, reject) => {
      gsap.to(`#${this._scrollContainer.id}`, {
        duration: 0.5,
        fill: "forwards",
        ease: Power2.easeOut,
        transform: `translate(-50%,${newPercentage}%)`,
        onUpdate: () => {
          this.centerDetect();
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  centerDetect() {
    const centerPos = this._center.getBoundingClientRect();
    this._imageContainers.forEach((image) => {
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

  moveTo(e) {
    if (this.moveActive) {
      console.log("cannot ");
    } else {
      this.moveActive = true;
      console.log(this.percent);
      const element = e.target.parentNode;
      const elementPos = element.getBoundingClientRect();
      const elementCenter = elementPos.top + elementPos.height / 2;

      const centerPos = this._center.getBoundingClientRect();
      const centerCenter = centerPos.top + centerPos.height / 2;

      const scrollHeight = this._scrollContainer.getBoundingClientRect().height;

      const distance = centerCenter - elementCenter;
      const distancePercent = (distance / scrollHeight) * 100;

      // console.log(distancePercent);

      this.scrollPercent(distancePercent);
      this.scrollAnimation(this.percent).then(() => {
        this.moveActive = false;
        this.cachePercent();
      });
    }
  }
}
