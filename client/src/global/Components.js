export class Components {
  constructor(key, generator, show, hide, config) {
    this._key = key;
    this._generator = generator;
    this._show = show;
    this._hide = hide;
    this._isInitial = config.isInitial || false;
  }
  get key() {
    return this._key;
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

  get isInitial() {
    return this._isInitial;
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
