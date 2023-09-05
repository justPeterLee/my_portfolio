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

  updateDisplayState() {
    const keys = Object.keys(this.components);

    if (keys.length) {
      this.isDisplay = true;
    } else {
      this.isDisplay = false;
    }

    return keys;
  }

  showComponent(componentInstance) {
    componentInstance.show();
    this.manualAdd(componentInstance);
    console.log(
      "key",
      this.session,
      componentInstance.key,
      this._isDisplay,
      this.components
    );
  }

  hideComponent(componentInstance) {
    // componentInstance.hide();
    componentInstance.hide();
    this.manualHide(componentInstance);
    console.log("key", this.session, componentInstance.key, this._isDisplay);
  }

  manualAdd(componentInstance) {
    this.components[componentInstance.key] = componentInstance;
    this.updateDisplayState();
  }

  manualHide(componentInstance) {
    const key = componentInstance.key;
    delete this._components[key];
    this.updateDisplayState();
  }

  hideAll() {
    const keys = Object.keys(this.components);

    keys.forEach((component) => {
      this.hideComponent(this.components[component]);
    });
  }
}
