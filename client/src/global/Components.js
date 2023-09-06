import { animation } from "../utils/animation/animation";
import { display } from "./Display";

export class Components {
  constructor(key, generate, show, hide, config) {
    this._key = key;
    this._generate = generate;
    this._show = show || animation.defaultShow;
    this._hide = hide || animation.defaultHide;
    this._isInitial = config.isInitial || false;
    this._element = null;
    this._rendererContainer = document.querySelector("#center");
  }
  get key() {
    return this._key;
  }

  get generate() {
    return this._generate;
  }

  get show() {
    return this._show;
  }

  get hide() {
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

  get rendererContainer() {
    return this._rendererContainer;
  }

  Show(element, tl) {
    this.show(element, tl);
  }

  Generate() {
    const genComponent = this.generate();
    this.rendererContainer.appendChild(genComponent);
    this.element = genComponent;

    return genComponent;
  }
}
