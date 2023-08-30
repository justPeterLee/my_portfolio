// page routing system
import { updater } from "../updater/updater";

const links = document.getElementsByClassName("page-links");
const linkArr = [...links];

linkArr.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    urlRoute();
  });
});

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();

  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  let location = window.location.pathname;
  if (location.length === 0) {
    location = "/";
  }

  updater();
};

window.onpopstate = urlLocationHandler;

window.route = urlRoute;

urlLocationHandler();
