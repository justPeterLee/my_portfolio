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
  constructor(url, title, sessionKey, parent, initialRender) {
    this._url = url;
    this._title = title || url.replace("/", "");
    this._sessionKey = sessionKey;
    this._parent = parent || document.querySelector("#center");
    this._initialRender = initialRender;
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

  get initialRender() {
    return this._initialRender;
  }
}

export const pages = new Pages({});

export const pagesObj = {};

export function createPage(url, title, sessionKey, parent, initialRender) {
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
        initialRender
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
