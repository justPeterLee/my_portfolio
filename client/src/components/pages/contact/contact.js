import { contactRender } from "./renderContact";
import { createPage } from "../../../global/Pages";
import { Components } from "../../../global/Components";
import { menuAnimation } from "../../../utils/animation/menuAnimation";
import { contactAnimation } from "../../../utils/animation/contactAnimation";
export const createContactPage = () => {
  createPage("Contact", "/contact", { contactContent }, menuAnimation.menuSide);
};

const contactContent = new Components(
  "contactContent",
  contactRender.contactContentContainer,
  contactAnimation.showContent,
  contactAnimation.hideContent,
  { isInitial: true }
);
