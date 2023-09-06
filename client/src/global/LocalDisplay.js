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
      this.addDisplay(component);
      this.updateState();
    }

    // console.log(this.components, this.isDisplay);
  }

  hideComponent(component) {
    return new Promise((resolve, reject) => {
      if (component.element) {
        component.Hide(component.element).then(() => {
          this.hideDisplay(component);
          component.element.remove();

          this.updateState();

          // console.log(this.components, this.isDisplay);
          resolve();
        });
      }
    });
    // hide

    // ungenerate
  }

  addDisplay(component) {
    this.components[component.key] = component;
  }

  hideDisplay(component) {
    if (this.components[component.key]) {
      delete this._components[component.key];
    }
  }

  updateState() {
    const keys = Object.keys(this.components);

    if (keys.length) {
      this.isDisplay = true;
    } else {
      this.isDisplay = false;
    }
  }
}
