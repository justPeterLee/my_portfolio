import { animation } from "../utils/animation/animation";
import { display } from "./Display";

export class Components {
  constructor(key, generator, show, hide, config) {
    this._key = key;
    this._generator = generator;
    this._show = show || animation.defaultShow;
    this._hide = hide || animation.defaultHide;
    this._isInitial = config.isInitial || false;
    this._element = null;
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

  get element() {
    return this._element;
  }

  set element(newElement) {
    this._element = newElement;
  }
  generate() {
    return new Promise((resolve, reject) => {
      const element = this.getGenerate();
      this.element = element;
      resolve(element);
    }).then((element) => {
      this.show();
    });
  }

  show() {
    if (this.element) {
      console.log(this.element);
      this.getShow(this.element);
    } else {
      console.log("no element to show");
    }
  }

  hide() {
    if (this.element) {
      this.getHide(this.element);
    } else {
      console.log("no element to hide");
    }
  }
}
