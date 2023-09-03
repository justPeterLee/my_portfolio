import gsap from "gsap";
import { rendered } from "./Rendered";

export class Display {
  constructor() {
    this._isDisplay = false;
    this._Display = null;
    this._session = null;
    this._timeline = gsap.timeline();
  }

  get isDisplay() {
    return this._isDisplay;
  }

  get Display() {
    return this._Display;
  }

  get session() {
    return this._session;
  }

  get scope() {
    return this._scope;
  }

  set setIsDisplay(bool) {
    this._isDisplay = bool;
  }

  set setDisplay(Display) {
    this._Display = Display;
  }

  set setSession(session) {
    this._session = session;
  }

  renderComponent(pageInstance) {
    pageInstance.initial(pageInstance.parent).then(() => {
      rendered.rendering(pageInstance);
    });
    this.update(pageInstance);
  }

  showComponent(pageInstance) {
    // if there is already something rendered and isnt the same render
    if (
      this.isDisplay &&
      this.Display &&
      this.session !== pageInstance.sessionKey
    ) {
      // this.hideComponent(pageInstance)
      console.log("must hide current session first:", this.Display);
      // run hideComponent
    }

    if (!this._isDisplay && !this.Display && !this.session) {
      // pageInstance.initalShow()
      console.log("Now avalible to show:", this.Display);
    }
  }

  hideComponent(pageInstance) {
    if (!this._isDisplay && !this.Display && !this.session) {
      // pageInstance.initalShow()
      console.log("nothing is able to hide:", this.Display);
    }

    if (
      this.isDisplay &&
      this.Display &&
      this.session !== pageInstance.sessionKey
    ) {
      // this.hideComponent(pageInstance)
      console.log("something able to hide", this.Display);
      // reset display
    }
  }

  update(pageInstance) {
    this.setIsDisplay = true;
    this.setDisplay = pageInstance;
    this.setSession = pageInstance.sessionKey;
  }

  reset() {
    this._isDisplay = false;
    this._Display = null;
    this._session = null;
  }
}

export const display = new Display();
