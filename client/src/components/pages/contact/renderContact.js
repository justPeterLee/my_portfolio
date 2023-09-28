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
  button(letter);
  postScript(letter);
  return contactContainer;
}

function letterContainer(parent) {
  const letter =
    "Greetings Peter,\n I think your website is super duper cool. I would love to get\n in contact with you. Please reply to the email at you earliest\n convince.";

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

  const hiddenInputContainer = document.createElement("span");
  hiddenInputContainer.id = "input-hidden-input";
  hiddenInputContainer.className = "letter-hidden-text";
  parent.appendChild(hiddenInputContainer);

  const inputContainerSpan = document.createElement("span");
  inputContainerSpan.id = "contact-input-container";
  hiddenInputContainer.appendChild(inputContainerSpan);

  const inputContainer = document.createElement("input");
  inputContainer.id = "contact-input";
  inputContainer.className = "letter-words";
  inputContainer.placeholder = "your email";
  inputContainerSpan.appendChild(inputContainer);

  const lable = document.createElement("label");
  lable.id = "contact-label";
  lable.className = "letter-words";
  lable.htmlFor = "contact-input";
  lable.innerHTML = "your email";
  // inputContainerSpan.appendChild(lable);
}

function postScript(parent) {
  // container
  const postScriptContainer = document.createElement("span");
  postScriptContainer.id = "ps-container";
  parent.appendChild(postScriptContainer);

  // title
  const postScriptTitle = document.createElement("span");
  postScriptTitle.id = "ps-title";
  postScriptContainer.appendChild(postScriptTitle);
  postScriptTitle.innerHTML = "PS";
  hidden(postScriptContainer, postScriptTitle, "hidden-ps");

  // input
  const postScriptInputContainer = document.createElement("span");
  postScriptInputContainer.id = "ps-input-container";
  postScriptContainer.appendChild(postScriptInputContainer);

  const postScriptInput = document.createElement("input");
  postScriptInput.id = "ps-input";
  postScriptInputContainer.appendChild(postScriptInput);
  hidden(postScriptContainer, postScriptInputContainer, "hidden-ps");

  // button
  const postButton = document.createElement("button");
  postButton.id = "ps-cancel";
  postScriptContainer.appendChild(postButton);
  postButton.innerHTML = "cancel";
  hidden(postScriptContainer, postButton, "hidden-ps");
}

function button(parent) {
  const buttonContainer = document.createElement("span");
  buttonContainer.id = "button-container";
  // buttonContainer.className = "letter-words";
  parent.appendChild(buttonContainer);

  const sendButton = document.createElement("button");
  sendButton.id = "send-button";
  sendButton.className = "letter-words";
  sendButton.innerHTML = "send";
  buttonContainer.appendChild(sendButton);

  const addButton = document.createElement("button");
  addButton.innerHTML = "add note";
  addButton.id = "add-button";
  addButton.className = "letter-words";
  addButton.dataset.add = 1;
  buttonContainer.appendChild(addButton);

  addButton.addEventListener("click", () => {
    if (addButton.dataset.add == 1) {
      // postScript(parent);
      addButton.dataset.add = 0;
    } else {
      addButton.dataset.add = 1;
    }
  });

  hidden(buttonContainer, sendButton, "contact-button");
  hidden(buttonContainer, addButton, "contact-button");
}

function hidden(parent, child, classname) {
  const hiddenInputContainer = document.createElement("span");
  // hiddenInputContainer.id = id;
  hiddenInputContainer.className = `letter-hidden-text ${classname}`;
  parent.appendChild(hiddenInputContainer);

  hiddenInputContainer.appendChild(child);
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
