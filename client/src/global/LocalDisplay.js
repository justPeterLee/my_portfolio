import { Display } from "./Display";
class LocalDisplay extends Display {
  constructor(session) {
    this._localSession = session;
  }

  get localSession() {
    return this._localSession;
  }

  showComponent(componentInstance) {}

  hideComponent(componentInstance) {}
}
