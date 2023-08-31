export function menuSelector() {
  const location = window.location.pathname;
  // console.log(location, linkArr);
  const links = document.getElementsByClassName("nav-menu-text-container");
  const linkArr = [...links];

  linkArr.forEach((link) => {
    if (link.dataset.pathname === location) {
      link.id = "link-selected";
    } else {
      link.id = "link-not-selected";
    }
  });

  if (ishover) {
    showSelected(linkArr);
  }
}

let ishover = false;

export function selectedHover() {
  const links = document.getElementsByClassName("nav-menu-text-container");
  const linkArr = [...links];
  const hoverContainer = document.querySelector("#nav-menu-hover-container");

  hoverContainer.addEventListener("mouseenter", () => {
    showSelected(linkArr);
  });
  hoverContainer.addEventListener("mouseleave", () => {
    hideSelected(linkArr);
  });
}

function showSelected(elements) {
  ishover = true;
  elements.forEach((element) => {
    if (element.dataset.pathname === window.location.pathname) {
      element.children[1].innerHTML = "selected";
    } else {
      element.children[1].innerHTML = element.dataset.title;
    }
  });
}

function hideSelected(elements) {
  ishover = false;
  elements.forEach((element) => {
    element.children[1].innerHTML = element.dataset.title;
  });
}
