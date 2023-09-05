class Rendered {
  constructor() {
    this._Rendered = {};
    this._called = 0;
  }

  get Rendered() {
    return this._Rendered;
  }

  set setRendered(name) {
    this._Rendered = name;
  }

  rendering(pageInstance) {
    this._Rendered[pageInstance.sessionKey] = pageInstance;
    this._called += 1;
    // console.log(this._Rendered, this._called);
  }
}

export const rendered = new Rendered();
