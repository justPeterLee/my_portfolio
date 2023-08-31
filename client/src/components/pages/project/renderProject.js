// renderer container
export function projectRenererContainer(parent) {
  const rendererContainer = document.createElement("div");
  rendererContainer.id = "project-renderer-container";
  parent.appendChild(rendererContainer);
}

// default view
export function renderScrollContent() {
  const scrollContainer = document.createElement("div");
  scrollContainer.id = "project-container";
  scrollContainer.className = "scroll-container";

  const content = document.createElement("p");
  content.id = "project-scroll-content";
  content.innerHTML = "project";

  const rendererContainerDOM = document.querySelector(
    "#project-renderer-container"
  );

  rendererContainerDOM.appendChild(scrollContainer);

  scrollContainer.appendChild(content);
}

export function projectInitial(parent) {
  projectRenererContainer(parent);
  renderScrollContent();
}
export const projectRender = {
  initial: projectInitial,
  rendererContainer: projectRenererContainer,
  renderScrollContent,
};
