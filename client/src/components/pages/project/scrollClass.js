import { gsap, Power2 } from "gsap";
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

    // this._isInitial = true;

    this._images.forEach((image) => {
      image.addEventListener("click", (e) => {
        if (!this._mouseMove) {
          this.moveTo(e);
        }
      });

      image.addEventListener("mouseover", (e) => {
        const position = e.target.dataset.position;
        const tri = document.querySelector(`#image-triangle-${position}`);
        if (!tri) return;

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

  imageParallax(newPercentage) {
    this._images.forEach((element) => {
      gsap.to(`#${element.id}`, {
        duration: 0.5,
        objectPosition: `center ${100 + newPercentage}%`,
      });
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
    if (this.moveActive && this.mouseMove) {
    } else {
      this.moveActive = true;
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
      this.imageParallax(this.percent);
      this.scrollAnimation(this.percent).then(() => {
        this.moveActive = false;
        this.cachePercent();
      });
      console.log("moved");
    }
  }

  scrollUp() {
    // this.scrollPercent(-5);
    this.percent -= 5;

    if (this.percent < -100) {
      this.percent = -99.9;
    }

    this._currPercent = this.percent;
    this.imageParallax(this.percent);
    this.scrollAnimation(this.percent);
  }

  scrollDown() {
    // this.scrollPercent(10);
    this.percent += 5;

    if (this.percent > 0) {
      this.percent = -0.9;
    }

    this._currPercent = this.percent;
    this.imageParallax(this.percent);
    this.scrollAnimation(this.percent);
  }
}
