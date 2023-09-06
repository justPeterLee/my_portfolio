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

  get timeline() {
    return this._timeline;
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
  }

  showComponent(pageInstance, render) {
    const isRender = render || false;

    // is something showing
    if (this._isDisplay) {
      // hide current display first
      console.log("must hide display first");
      this.Display.hide()
        .then(() => {
          console.log("page hidden");
          pageInstance.initial();
        })
        .catch(() => {
          console.log("could not hide page");
        });
      // show display
    } else {
      // show new display
      pageInstance.initial();
    }
    // console.log("old: ", this.Display);
    // console.log("new: ", pageInstance);
    this.update(pageInstance);
  }

  hideComponent(pageInstance) {}

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
