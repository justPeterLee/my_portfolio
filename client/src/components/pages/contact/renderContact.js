export function contactContentContainer() {
  const contactContentContainer = document.createElement("div");
  contactContentContainer.id = "contact-content-container";

  const text = document.createElement("p");
  text.innerHTML = "contact";

  contactContentContainer.appendChild(text);

  return contactContentContainer;
}

export const contactRender = {
  contactContentContainer,
};
