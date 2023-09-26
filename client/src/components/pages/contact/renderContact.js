import "../../../../public/css/contact.css";

export function contactContentContainer() {
  const contactContainer = document.createElement("div");
  contactContainer.id = "contact-container";
  contactContainer.className = "container";

  // const text = document.createElement("p");
  // text.innerHTML = "contact";
  // contactContainer.appendChild(text);

  // const button = document.createElement("button");
  // button.innerHTML = "send";
  // button.id = "send-email";
  // button.class = "button";
  // contactContainer.appendChild(button);

  // button.addEventListener("click", () => {
  //   console.log("clicked");
  //   test();
  // });

  const letter = letterContainer(contactContainer);
  inputContainer(letter);
  return contactContainer;
}

function letterContainer(parent) {
  const letter =
    "Greetings Peter,\n I think your website is super duper cool.\n I would love to get in contact with you. Please \nreply to the email at you earliest convince.";

  let letterArray = letter.split("\n");

  const textContainer = document.createElement("h3");
  textContainer.id = "letter-text-container";
  parent.appendChild(textContainer);

  letterArray.forEach((string, index) => {
    const hiddenContainer = document.createElement("span");
    hiddenContainer.className = "letter-hidden-text";
    textContainer.appendChild(hiddenContainer);

    const stringContainer = document.createElement("span");
    stringContainer.id = `letter-words-${index}`;
    stringContainer.className = "letter-words";
    stringContainer.innerHTML = string;
    hiddenContainer.appendChild(stringContainer);
  });

  return textContainer;
}

function inputContainer(parent) {
  const hiddenContainer = document.createElement("span");
  hiddenContainer.id = "letter-hidden-input";
  hiddenContainer.className = "letter-hidden-text";
  parent.appendChild(hiddenContainer);

  const stringContainer = document.createElement("span");
  stringContainer.id = `letter-words-ending`;
  stringContainer.className = "letter-words";
  stringContainer.innerHTML = "Yours truly, ";
  hiddenContainer.appendChild(stringContainer);

  const inputContainerSpan = document.createElement("span");
  inputContainerSpan.id = "contact-input-container";
  hiddenContainer.appendChild(inputContainerSpan);

  const inputContainer = document.createElement("input");
  inputContainer.id = "contact-input";
  inputContainer.className = "letter-words";
  inputContainer.placeholder = "your email";
  inputContainerSpan.appendChild(inputContainer);

  const lable = document.createElement("label");
  lable.id = "contact-label";
  // lable.className = "letter-words";
  lable.htmlFor = "contact-input";
  lable.innerHTML = "your email";
  inputContainerSpan.appendChild(lable);
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
