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

  letterContainer(contactContainer);

  return contactContainer;
}

function letterContainer(parent) {
  const letter =
    "Howdy Peter,\n I think your website is super duper cool.\n I would love to get in contact with you.\n Please reply to the email at you earliest convince.\n thank you kindly, ";

  let letterArray = letter.split("\n");
  console.log(letterArray);

  const textContainer = document.createElement("h3");
  textContainer.id = "letter-text-container";
  parent.appendChild(textContainer);

  letterArray.forEach((string, index) => {
    const stringContainer = document.createElement("span");
    stringContainer.id = `letter-words-${index}`;
    stringContainer.className = "letter-words";
    stringContainer.innerHTML = string;
    textContainer.appendChild(stringContainer);
  });
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
