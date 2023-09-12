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
    this._scrollContainer.animate(
      {
        transform: `translate(-50%,${newPercentage}%)`,
      },
      { duration: 1000, fill: "forwards" }
    );

    this.centerDetect();
  }

  centerDetect() {
    const centerPos = this._center.getBoundingClientRect();
    // console.log(this._imageContainers);
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

  moveTo() {}
}
