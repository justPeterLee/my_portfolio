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
}
