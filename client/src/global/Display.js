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

  showComponent(pageInstance) {
    // is something showing
    pageInstance.initial();
    this.update(pageInstance);
  }

  hideComponent(pageInstance) {
    this.Display.hide()
      .then(() => {
        this.showComponent(pageInstance);
        this.inProcess = false;
      })
      .catch(() => {
        console.log("could not hide page");
      });
  }

  avalible(pageInstance) {
    if (this.session === pageInstance.sessionKey) {
      console.log("same page");
    } else if (this.isDisplay && this.inProcess) {
      // there is something showing and it is in the process of hiding
      console.log("in progress");
      const processObserver = setInterval(
        () => this.waitProgress(pageInstance, processObserver),
        100
      );

      setTimeout(() => {
        clearInterval(processObserver);
      }, 1000);
    } else if (this.isDisplay) {
      // hide component
      this.hideComponent(pageInstance);
    } else {
      // show component
      this.showComponent(pageInstance);
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

  waitProgress(pageInstance, observer) {
    if (this.isDisplay) {
      this.hideComponent(pageInstance);
      clearInterval(observer);
    }
  }
}

export const display = new Display();
