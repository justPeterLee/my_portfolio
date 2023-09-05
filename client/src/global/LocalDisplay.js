import { Display } from "./Display";
export class LocalDisplay {
  constructor(session) {
    this._isDisplay = false;
    this._components = {};
  }

  get localSession() {
    return this._localSession;
  }

  get components() {
    return this._components;
  }

  showComponent(componentInstance) {}

  hideComponent(componentInstance) {}

  manualAdd(componentInstance) {
    this.components[componentInstance.key] = componentInstance;
  }

  manualHide(componentInstance) {}
}
