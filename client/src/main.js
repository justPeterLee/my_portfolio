import { menuSelector } from "./components/navMenu/NavMenu";
import { rendered } from "./global/Rendered";
import { projectRender } from "./components/pages/project/renderProject";
menuSelector();

// rendered.addRender("asdf");
// console.log(rendered.getRendered);
console.log(rendered.Rendered);
rendered.Rendered = { apple: "apple" };
console.log(rendered.Rendered);
