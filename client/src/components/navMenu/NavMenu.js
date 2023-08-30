const links = document.getElementsByClassName("page-links");
const linkArr = [...links];

export function menuSelector() {
  const location = window.location.pathname;
  // console.log(location, linkArr);

  linkArr.forEach((link) => {
    // console.log(link);
  });
}
