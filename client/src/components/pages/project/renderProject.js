// renderer container
export function projectRenererContainer(parent) {
  const rendererContainer = `<div id="project-renderer-container"></div>`;
  parent.appendChild(rendererContainer);
}

// default view
export function renderScrollContent() {
  const scrollContainer = `<div id="project-container" class="scroll-container"></div>`;

  const content = document.createElement("p");
  content.id = "project-scroll-content";
  content.innerHTML = "project";

  const rendererContainerDOM = document.querySelector(
    "#project-renderer-container"
  );
  rendererContainerDOM.appendChild(scrollContainerDOM);
  const scrollContainerDOM = document.querySelector("#project-container");

  scrollContainer.appendChild(content);
}

export const projectRender = {
  rendererContainer: projectRenererContainer,
  renderScrollContent,
};
