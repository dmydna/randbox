function renderBar(handler) {
  const template = document.createElement("template");

  template.innerHTML = `
        <div class="progress">
            <div class="progress-bar"></div>
        </div>
    `;
  const container = template.content.cloneNode(true);

  return container;
}

export default renderBar;
