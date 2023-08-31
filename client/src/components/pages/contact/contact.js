import { contactGenerator } from "./renderContact";
import { createPage } from "../../../global/Pages";

export const createContactPage = () => {
  createPage(
    "/contact",
    "Contact",
    "contactSession",
    undefined,
    contactGenerator.initial
  );
};
