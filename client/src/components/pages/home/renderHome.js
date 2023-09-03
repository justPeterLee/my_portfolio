function homeRendererContainer(parent) {
  return new Promise((resolve, reject) => {
    const rendererContainer = document.createElement("div");
    rendererContainer.id = "home-renderer-container";
    parent.appendChild(rendererContainer);

    resolve();
  });
}

export const homeRender = {
  homeRendererContainer,
};
