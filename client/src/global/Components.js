class Components {
  constructor(generator, show, hide, config) {
    this._generator = generator;
    this._show = show;
    this._hide = hide;
    this._isInitial = config.isInitial || false;
  }

  get getGenerate() {
    return this._generator;
  }

  get getShow() {
    return this._show;
  }

  get getHide() {
    return this._hide;
  }

  generate() {
    this.getGenerate();
  }

  show() {
    this.getShow();
  }

  hide() {
    this.getHide();
  }
}
