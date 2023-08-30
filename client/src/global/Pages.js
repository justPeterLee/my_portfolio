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
  constructor() {
    this._url = "";
  }
}

export const pages = new Pages({});
