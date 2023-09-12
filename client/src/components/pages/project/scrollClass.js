class projectScroll {
  constructor(scrollContainer, center, images, imageContainers) {
    this._scrollContainer = scrollContainer;
    this._center = center;
    this._images = images;
    this._imageContainers = imageContainers;

    this._percent = 0;
    this._imagePercent = 0;
    this._isCenter = null;
  }

  get percent() {
    return this._percent;
  }

  set percent(newPercent) {
    if (newPercent >= -100 && newPercent <= 0) {
      this._percent = newPercent;
    }

    if (newPercent < -100) {
      this._percent = 99.9;
    }
    if (newPercent > 0) {
      this._percent = -0.1;
    }
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

  scrollPercent() {}

  scrollAnimation() {}

  centerDetect() {}

  moveTo() {}
}
