import gsap from "gsap";
import { rendered } from "./Rendered";

export class Display {
  constructor() {
    this._isDisplay = false;
    this._Display = null;
    this._session = null;
    this._timeline = gsap.timeline();
    this._inProcess = false;
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

  get inProcess() {
    return this._inProcess;
  }

  set inProcess(bool) {
    this._inProcess = bool;
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
          pageInstance.initial();
          this.update(pageInstance);

          this.inProcess = false;
        })
        .catch(() => {
          console.log("could not hide page");
        });
      // show display
    } else {
      // show new display
      pageInstance.initial();
      this.update(pageInstance);
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

  InProcess() {
    return new Promise((resolve, reject) => {
      let isInProcess = this.inProcess;
      while (isInProcess) {
        isInProcess = this.inProcess;
      }

      if (!isInProcess) {
        console.log("no longer in progress");
        resolve();
      } else {
        console.log("still in progress");
      }
      setTimeout(() => {
        reject();
      }, 5000);
    });
  }
}

export const display = new Display();
