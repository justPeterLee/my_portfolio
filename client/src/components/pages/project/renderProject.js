// renderer container
export function projectRenererContainer(parent) {
  return new Promise((resolve, reject) => {
    const rendererContainer = document.createElement("div");
    rendererContainer.id = "project-renderer-container";
    parent.appendChild(rendererContainer);

    // if(rendererContainer)

    resolve(rendererContainer);
  });
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

  return scrollContainer;
}

export function renderScrollContents() {
  const scrollContainer = document.createElement("div");
  scrollContainer.id = "project-containers";
  scrollContainer.className = "scroll-containers";

  const content = document.createElement("p");
  content.id = "project-scroll-contents";
  content.innerHTML = "asdfasfadfadf";

  const rendererContainerDOM = document.querySelector(
    "#project-renderer-container"
  );

  rendererContainerDOM.appendChild(scrollContainer);

  scrollContainer.appendChild(content);

  return scrollContainer;
}

export const projectRender = {
  rendererContainer: projectRenererContainer,
  renderScrollContent,
  renderScrollContents,
};
