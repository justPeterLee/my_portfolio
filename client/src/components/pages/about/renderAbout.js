export function aboutRendererContainer(parent) {
  return new Promise((resolve, reject) => {
    const rendererContainer = document.createElement("div");
    rendererContainer.id = "about-renderer-container";
    parent.appendChild(rendererContainer);
    resolve();
  });
}

export function aboutContentContainer() {
  const aboutContentContainer = document.createElement("div");
  aboutContentContainer.id = "about-content-container";

  const text = document.createElement("p");
  text.innerHTML = "about";

  aboutContentContainer.appendChild(text);

  const rendererContainer = document.querySelector("#about-renderer-container");
  rendererContainer.appendChild(aboutContentContainer);

  return aboutContentContainer;
}

export const aboutRender = {
  rendererContainer: aboutRendererContainer,
  aboutContentContainer,
};
