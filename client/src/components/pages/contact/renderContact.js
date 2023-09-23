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

  button.addEventListener("click", () => {
    console.log("clicked");
    test();
  });
  return contactContainer;
}

async function test() {
  const res = await fetch(`/api/v1/contact/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "this is the message",
      email: "email@email.com",
    }),
  });
  console.log(await res.text());
}
export const contactRender = {
  contactContentContainer,
};
