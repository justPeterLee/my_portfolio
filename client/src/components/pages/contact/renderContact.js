import "../../../../public/css/contact.css";
import {
  showNote,
  hideNote,
  invalidEmailAni,
  validEmailAni,
} from "../../../utils/animation/contactAnimation";
import edit from "../../../../public/edit.svg";
import cancel from "../../../../public/cancel.svg";
import check from "../../../../public/check.svg";
import x from "../../../../public/x.svg";

let postScriptNote = "";
let email = "";
let isValidate = null;
export function contactContentContainer() {
  postScriptNote = "";
  email = "";
  isValidate = null;

  const contactContainer = document.createElement("div");
  contactContainer.id = "contact-container";
  contactContainer.className = "container";

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

  const invalidEmail = document.createElement("img");
  invalidEmail.id = "invalid-email";
  invalidEmail.className = "email-validate-state";
  invalidEmail.src = x;
  inputContainerSpan.append(invalidEmail);

  const validEmail = document.createElement("img");
  validEmail.id = "valid-email";
  validEmail.className = "email-validate-state";
  validEmail.src = check;
  inputContainerSpan.append(validEmail);

  const inputContainer = document.createElement("input");
  inputContainer.id = "contact-input";
  inputContainer.className = "letter-words";
  inputContainer.placeholder = "your email";
  inputContainerSpan.appendChild(inputContainer);

  inputContainer.addEventListener("change", (e) => {
    email = e.target.value;
    emailValidator();
  });
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

  sendButton.addEventListener("click", sendEmail);
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

  hidden(buttonContainer, [sendButton, addButton], "contact-hidden-button");

  const addButtonTip = document.createElement("span");
  addButtonTip.innerHTML = "add note";
  addButtonTip.id = "tooltip";
  addButton.classname = "container";
  buttonContainer.appendChild(addButtonTip);

  addButton.addEventListener("click", () => {
    if (addButton.dataset.add == 1) {
      // postScript(parent);
      addButtonTip.innerHTML = "cancel";
      showNote();
      addButton.dataset.add = 0;
      svg.src = cancel;
    } else {
      addButtonTip.innerHTML = "add note";
      postScriptNote = "";
      document.querySelector("#ps-input").value = postScriptNote;
      hideNote();
      addButton.dataset.add = 1;
      svg.src = edit;
    }
  });

  addButton.addEventListener("mouseover", () => {
    addButtonTip.style.visibility = "visible";
  });
  addButton.addEventListener("mouseout", () => {
    addButtonTip.style.visibility = "hidden";
  });
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
  postScriptTitle.innerHTML = "P.S.";
  hidden(postScriptContainer, postScriptTitle, "hidden-ps");

  // input
  const postScriptInputContainer = document.createElement("span");
  postScriptInputContainer.id = "ps-input-container";
  postScriptContainer.appendChild(postScriptInputContainer);

  const postScriptInput = document.createElement("textarea");
  postScriptInput.id = "ps-input";
  postScriptInput.placeholder = "enter note";
  postScriptInputContainer.appendChild(postScriptInput);
  hidden(postScriptContainer, postScriptInputContainer, "hidden-ps");

  postScriptInput.addEventListener("change", (e) => {
    postScriptNote = e.target.value;
  });
}

function hidden(parent, child, classname) {
  const elementArr = Array.isArray(child) ? child : [child];
  const hiddenInputContainer = document.createElement("span");
  hiddenInputContainer.className = `${classname}`;

  elementArr.forEach((element) => {
    hiddenInputContainer.appendChild(element);
  });
  parent.appendChild(hiddenInputContainer);
  return hiddenInputContainer;
}

async function sendEmail() {
  const data = { email, postScriptNote };
  // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  emailValidator();
  if (isValidate) {
    console.log("send from", data.email);
    const res = await fetch(`/api/v1/contact/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(await res.json());
  } else {
    console.log("invalid email", data.email);
  }
  console.log(data);
}

function emailValidator() {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(email)) {
    isValidate = validEmailAni(isValidate);
  } else {
    isValidate = invalidEmailAni(isValidate);
  }
}
export const contactRender = {
  contactContentContainer,
};
