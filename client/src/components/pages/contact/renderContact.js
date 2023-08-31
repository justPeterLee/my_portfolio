export function contactRendererContainer(parent) {
  console.log(parent);
  const rendererContainer = document.createElement("div");
  rendererContainer.id = "contact-renderer-container";
  parent.appendChild(rendererContainer);

  return rendererContainer;
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

export function contactInitial(parent) {
  return new Promise((resolve, reject) => {
    const renderer = contactRendererContainer(parent);
    const content = contactContentContainer();

    if (renderer && content) {
      resolve();
    } else {
      reject("could not render page");
    }
  });
}

export const aboutGenerator = {
  initial: contactInitial,
  rendererContainer: contactRendererContainer,
  contactContentContainer,
};
