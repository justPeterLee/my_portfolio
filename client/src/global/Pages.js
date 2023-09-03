import { Display } from "./Display";

export class PageInstance {
  constructor(url, title, sessionKey, parent, rendererContainer, components) {
    this._url = url;
    this._title = title || url.replace("/", "");
    this._sessionKey = sessionKey;
    this._parent = parent || document.querySelector("#center");
    this._rendererContainer = rendererContainer;
    this._components = components || {};
    this._localDisplay = new Display();
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

  initial(parent) {
    return new Promise((resolve, reject) => {
      const currParent = parent || this.parent;
      this.rendererContainer(currParent).then(() => {
        console.log("just rendered renderer container");
      });

      this.initialComponent().forEach((component) => {
        component.generate();
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
}

export const pagesObj = {};

export function createPage(
  url,
  title,
  sessionKey,
  parent,
  rendererContainer,
  components
) {
  return new Promise((resolve, reject) => {
    console.log(document.querySelector("#center"));
    if (pagesObj[url]) {
      reject("page already created");
    } else {
      const newPage = new PageInstance(
        url,
        title,
        sessionKey,
        parent,
        rendererContainer,
        components
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
