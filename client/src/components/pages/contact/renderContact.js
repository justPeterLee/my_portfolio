export function contactRendererContainer(parent) {
  return new Promise((resolve, reject) => {
    const rendererContainer = document.createElement("div");
    rendererContainer.id = "contact-renderer-container";
    parent.appendChild(rendererContainer);

    resolve(rendererContainer);
  });
}

export function contactContentContainer() {
  const contactContentContainer = document.createElement("div");
  contactContentContainer.id = "contact-content-container";

  const text = document.createElement("p");
  text.innerHTML = "contact";

  contactContentContainer.appendChild(text);

  const rendererContainer = document.querySelector(
    "#contact-renderer-container"
  );
  rendererContainer.appendChild(contactContentContainer);

  return contactContentContainer;
}

export const contactRender = {
  rendererContainer: contactRendererContainer,
  contactContentContainer,
};
