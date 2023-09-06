import { gsap } from "gsap";
import { menuAnimation } from "../utils/animation/menuAnimation";
import { LocalDisplay } from "./LocalDisplay";
export class PageInstance {
  constructor(title, url, components, menuAnimations) {
    this._title = title || url.replace("/", "");
    this._url = url;
    this._sessionKey = `${url}${Math.random()}`;

    this._components = components || {};

    this._menuAnimation = menuAnimations || menuAnimation.menuOrigin;

    this._localDisplay = new LocalDisplay(this._sessionKey);
    this._rendererElement = null;
  }

  get title() {
    return this._title;
  }

  get url() {
    return this._url;
  }

  get sessionKey() {
    return this._sessionKey;
  }

  get components() {
    return this._components;
  }

  get menuAnimation() {
    return this._menuAnimation;
  }

  get localDisplay() {
    return this._localDisplay;
  }

  get rendererElement() {
    return this._rendererElement;
  }

  set rendererElement(element) {
    this._rendererElement = element;
  }

  Initial() {
    console.log(this.getInitial());
  }

  getInitial() {
    const keys = Object.getOwnPropertyNames(this.components);
    const initialComponents = keys.map((key) => {
      const component = this.components[key];
      if (component.isInitial) {
        return component;
      }
    });

    return initialComponents;
  }
}

export const pagesObj = {};

export function createPage(title, url, components, menuAnimations) {
  return new Promise((resolve, reject) => {
    if (pagesObj[url]) {
      reject("page already created");
    } else {
      const newPage = new PageInstance(title, url, components, menuAnimations);

      if (newPage) {
        resolve(newPage);
      } else {
        reject("could not create page");
      }
    }
  })
    .then((res) => {
      pagesObj[res.url] = res;
    })
    .catch((err) => {
      console.log("couldn't create page", err);
    });
}
