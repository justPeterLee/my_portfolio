import "../../../../public/css/contact.css";

export function contactContentContainer() {
  const contactContainer = document.createElement("div");
  contactContainer.id = "contact-container";
  contactContainer.className = "container";

  const text = document.createElement("p");
  text.innerHTML = "contact";
  contactContainer.appendChild(text);

  const button = document.createElement("button");
  button.innerHTML = "send";
  button.id = "send-email";
  button.class = "button";
  contactContainer.appendChild(button);

  return contactContainer;
}

export const contactRender = {
  contactContentContainer,
};
