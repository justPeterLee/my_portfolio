import { Display, display } from "./Display";
import { gsap } from "gsap";
import { menuAnimation } from "../utils/animation/menuAnimation";

export class PageInstance {
  constructor(
    url,
    title,
    sessionKey,
    parent,
    rendererContainer,
    components,
    menuAnimations
  ) {
    this._url = url;
    this._title = title || url.replace("/", "");
    this._sessionKey = sessionKey;

    this._parent = parent || document.querySelector("body");
    this._rendererContainer = rendererContainer;
    this._components = components || {};

    this._menuAnimation = menuAnimations || menuAnimation.menuOrigin;

    this._localDisplay = new Display();
    this._localTL = gsap.timeline;
  }

  get url() {
    return this._url;
  }

  get title() {
    return this._title;
  }

  get sessionKey() {
    return this._sessionKey;
  }

  get parent() {
    return this._parent;
  }

  get rendererContainer() {
    return this._rendererContainer;
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

  initial(parent) {
    return new Promise((resolve, reject) => {
      const currParent = parent || this.parent;
      this.rendererContainer(currParent).then(() => {
        this.initialComponent().forEach((component) => {
          component.generate();
        });
      });

      resolve();
    });
  }

  initialComponent() {
    const keys = Object.keys(this.components);

    return keys.map((component) => {
      if (this.components[component].isInitial) {
        return this.components[component];
      }
    });
  }

  menu(initial) {
    this.menuAnimation(initial);
  }
}

export const pagesObj = {};

export function createPage(
  url,
  title,
  sessionKey,
  parent,
  rendererContainer,
  components,
  menuAnimations
) {
  return new Promise((resolve, reject) => {
    if (pagesObj[url]) {
      reject("page already created");
    } else {
      const newPage = new PageInstance(
        url,
        title,
        sessionKey,
        parent,
        rendererContainer,
        components,
        menuAnimations
      );

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
      console.log("couldn't create page");
    });
}
