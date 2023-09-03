import { animation } from "../utils/animation/animation";
export class Components {
  constructor(key, generator, show, hide, config) {
    this._key = key;
    this._generator = generator;
    this._show = show || animation.defaultShow;
    this._hide = hide || animation.defaultHide;
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
    return new Promise((resolve, reject) => {
      const element = this.getGenerate();
      resolve(element);
    }).then((element) => {
      this.show(element);
    });
  }

  show(element) {
    this.getShow(element);
  }

  hide(element) {
    this.getHide(element);
  }
}
