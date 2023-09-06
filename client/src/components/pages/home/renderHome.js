function emptyContent() {
  const container = document.createElement("div");
  container.id = "empty-container";
  container.style.position = "absolute";

  return container;
}
export const homeRender = {
  emptyContent,
};
