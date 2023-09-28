import "../../../../public/css/contact.css";
import { showNote, hideNote } from "../../../utils/animation/contactAnimation";
import edit from "../../../../public/edit.svg";
import cancel from "../../../../public/cancel.svg";
let postScriptNote = "";
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
  postScript(letter);
  button(letter);
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
    if (index === 0) hiddenContainer.style.marginBottom = "2rem";
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

function button(parent) {
  const buttonContainer = document.createElement("span");
  buttonContainer.id = "button-container";
  // buttonContainer.className = "letter-words";
  parent.appendChild(buttonContainer);

  const sendButton = document.createElement("button");
  sendButton.id = "send-button";
  sendButton.className = "contact-button";
  sendButton.innerHTML = "send";
  buttonContainer.appendChild(sendButton);

  sendButton.addEventListener("click", () => {
    // console.log(postScriptNote);
  });
  const addButton = document.createElement("button");
  // addButton.innerHTML = "add note";
  addButton.id = "add-button";
  addButton.className = "contact-button";
  addButton.dataset.add = 1;
  buttonContainer.appendChild(addButton);

  const svg = document.createElement("img");
  svg.src = edit;
  svg.className = "edit";
  addButton.append(svg);

  addButton.addEventListener("click", () => {
    if (addButton.dataset.add == 1) {
      // postScript(parent);
      showNote();
      addButton.dataset.add = 0;
      svg.src = cancel;
    } else {
      postScriptNote = "";
      document.querySelector("#ps-input").value = postScriptNote;
      hideNote();
      addButton.dataset.add = 1;
      svg.src = edit;
    }
  });

  hidden(buttonContainer, [sendButton, addButton], "contact-hidden-button");
  // hidden(buttonContainer, addButton, "contact-hidden-button");
}

function postScript(parent) {
  // container
  const postScriptContainer = document.createElement("span");
  postScriptContainer.id = "ps-container";
  postScriptContainer.style.display = "none";
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

  postScriptInput.addEventListener("change", (e) => {
    postScriptNote = e.target.value;
  });
}

function hidden(parent, child, classname) {
  const elementArr = Array.isArray(child) ? child : [child];

  elementArr.forEach((element) => {
    const hiddenInputContainer = document.createElement("span");
    hiddenInputContainer.className = `${classname}`;
    hiddenInputContainer.appendChild(element);
    parent.appendChild(hiddenInputContainer);
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
