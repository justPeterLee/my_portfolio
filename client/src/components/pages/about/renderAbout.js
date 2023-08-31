export function aboutRendererContainer(parent) {
  console.log(parent);
  const rendererContainer = document.createElement("div");
  rendererContainer.id = "about-renderer-container";
  parent.appendChild(rendererContainer);

  return rendererContainer;
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

export function aboutInital(parent) {
  return new Promise((resolve, reject) => {
    const renderer = aboutRendererContainer(parent);
    const content = aboutContentContainer();

    if (renderer && content) {
      resolve();
    } else {
      reject("could not render page");
    }
  });
}

export const aboutGenerator = {
  initial: aboutInital,
  rendererContainer: aboutRendererContainer,
  aboutContentContainer,
};
