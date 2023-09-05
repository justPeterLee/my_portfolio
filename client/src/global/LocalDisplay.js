import { Display } from "./Display";
export class LocalDisplay {
  constructor(session) {
    this._isDisplay = false;
    this._components = {};
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

  showComponent(componentInstance) {}

  hideComponent(componentInstance) {
    // componentInstance.hide();
  }

  manualAdd(componentInstance) {
    this.components[componentInstance.key] = componentInstance;
    this.updateDisplayState();
  }

  manualHide(componentInstance) {}

  hide() {
    console.log(this.components);
    const keys = Object.keys(this.components);
    keys.forEach((component) => {
      this.hideComponent(component);
    });
  }
}
