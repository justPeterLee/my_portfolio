import { Display } from "./Display";
export class LocalDisplay {
  constructor(session) {
    this._isDisplay = false;
    this._components = {};
    this._session = session;
  }

  get session() {
    return this._session;
  }
  get isDisplay() {
    return this._isDisplay;
  }

  set isDisplay(state) {
    this._isDisplay = state;
  }

  get components() {
    return this._components;
  }

  showComponent(component) {
    // generate
    const genComponent = component.Generate();

    // show
    if (genComponent) {
      component.Show(genComponent);
    }
  }

  hideComponent(component) {
    // hide
    // ungenerate
  }

  updateState() {}
}
