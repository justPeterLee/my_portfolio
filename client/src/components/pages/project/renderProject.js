// renderer container
export function projectRenererContainer(parent) {
  return new Promise((resolve, reject) => {
    console.log(parent);
    const rendererContainer = document.createElement("div");
    rendererContainer.id = "project-renderer-container";
    parent.appendChild(rendererContainer);

    // if(rendererContainer)
    console.log(parent);
    resolve();
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

export function projectInitial(parent) {
  return new Promise((resolve, reject) => {
    const renderContainer = projectRenererContainer(parent);
    const scrollContainer = renderScrollContent();

    if (renderContainer && scrollContainer) {
      resolve();
    } else {
      reject("could not render page");
    }
  });
}

export const projectRender = {
  initial: projectInitial,
  rendererContainer: projectRenererContainer,
  renderScrollContent,
};
