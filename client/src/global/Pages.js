class Pages {
  constructor(pages) {
    this._Pages = pages;
  }

  get Pages() {
    return this._Pages;
  }

  set setPages(page) {
    this._Pages = page;
  }
}

export class PageInstance {
  constructor(url, sessionKey, rendererContainer, defaultContent) {
    this._url = url;
    this._rendererContainer = rendererContainer;
    this._defaultContent = defaultContent;
    this._sessionKey = sessionKey;
  }

  get url() {
    return this._url;
  }

  get sessionKey() {
    return this._sessionKey;
  }

  get rendererContainer() {
    return this._rendererContainer;
  }

  get defaultContent() {
    return this.defaultContent;
  }
}

export const pages = new Pages({});

export const pagesObj = {};

export function createPage(url, sessionKey, rendererContainer, defaultContent) {
  return new Promise((resolve, reject) => {
    if (pagesObj[url]) {
      reject("page already created");
    } else {
      const newPage = new PageInstance(
        url,
        sessionKey,
        rendererContainer,
        defaultContent
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
