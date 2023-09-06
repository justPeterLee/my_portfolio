function aboutContentContainer() {
  const aboutContentContainer = document.createElement("div");
  aboutContentContainer.id = "about-content-container";

  const text = document.createElement("p");
  text.innerHTML = "about";

  aboutContentContainer.appendChild(text);

  return aboutContentContainer;
}

export const aboutRender = {
  aboutContentContainer,
};
