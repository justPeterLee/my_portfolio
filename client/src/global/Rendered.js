class Rendered {
  constructor() {
    this._Rendered = {};
  }

  get Rendered() {
    return this._Rendered;
  }

  set Rendered(name) {
    this._Rendered = name;
  }

  rendering(pageInstance) {
    console.log(pageInstance);
  }
}

export const rendered = new Rendered();
