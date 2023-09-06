import { contactRender } from "./renderContact";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";
import { menuAnimation } from "../../../utils/animation/menuAnimation";
export const createContactPage = () => {
  createPage("Contact", "/contact", { contactContent }, menuAnimation.menuSide);
};

const contactContent = new Components(
  "contactContent",
  contactRender.contactContentContainer,
  null,
  null,
  { isInitial: true }
);
