import { contactRender } from "./renderContact";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";

export const createContactPage = () => {
  createPage(
    "/contact",
    "Contact",
    "contactSession",
    undefined,
    contactRender.rendererContainer,
    { contactContent }
  );
};

const contactContent = new Components(
  "contactContent",
  contactRender.contactContentContainer,
  null,
  null,
  { isInitial: true }
);
