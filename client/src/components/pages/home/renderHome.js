function homeRendererContainer(parent) {
  const rendererContainer = document.createElement("div");
  rendererContainer.id = "project-renderer-container";
  parent.appendChild(rendererContainer);

  return rendererContainer;
}

export function homeInitial(parent) {
  return new Promise((resolve, reject) => {
    const renderContainer = homeRendererContainer(parent);

    if (renderContainer) {
      resolve();
    } else {
      reject("could not render page");
    }
  });
}
