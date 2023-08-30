import { menuSelector } from "./components/navMenu/NavMenu";
import { rendered } from "./global/Rendered";
menuSelector();

// rendered.addRender("asdf");
// console.log(rendered.getRendered);
console.log(rendered.Rendered);
rendered.Rendered = { apple: "apple" };
console.log(rendered.Rendered);
