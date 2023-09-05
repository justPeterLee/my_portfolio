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

    // same page
    if (this.session === pageInstance.sessionKey) {
      console.log("same page");
      return;
    }

    // if already displaying
    if (this.isDisplay && this.Display) {
      // console.log("something is displaying:");
      // hide current display
      this.hideComponent(this.Display).then(() => {
        console.log("DONE hiding");
        if (isRender) {
          this.renderComponent(pageInstance);
        } else {
          pageInstance.show();
        }
      });
    } else {
      // console.log("nothing is displaying");
      if (isRender) {
        this.renderComponent(pageInstance);
      } else {
        pageInstance.show();
      }
    }

    this.update(pageInstance);
    // // if there is already something rendered and isnt the same render
    // if (this.isDisplay && this.Display) {
    //   // this.hideComponent(pageInstance)
    //   console.log("must hide current session first:", this.Display);
    //   this.hideComponent(this.Display).then(() => {
    //     // pageInstance.show();
    //     console.log("now show");
    //     if (isRender) {
    //       console.log("rendering");
    //       pageInstance.initial(pageInstance.parent).then(() => {
    //         rendered.rendering(pageInstance);
    //       });
    //     } else {
    //       console.log("Now avalible to show:", this.Display);
    //       pageInstance.show();
    //     }
    //   });
    //   // run hideComponent
    // } else {
    //   if (isRender) {
    //     console.log("rendering");
    //     pageInstance.initial(pageInstance.parent).then(() => {
    //       rendered.rendering(pageInstance);
    //     });
    //   } else {
    //     console.log("Now avalible to show:", this.Display);
    //     pageInstance.show();
    //   }
    // }
  }

  hideComponent(pageInstance) {
    return new Promise((resolve, reject) => {
      // console.log("something able to hide", pageInstance);
      pageInstance.hide();
      this.reset();
      setTimeout(() => {
        resolve();
      }, 500);
    });
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
