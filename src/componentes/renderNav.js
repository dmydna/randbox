function renderNav() {
  const template = document.createElement("template");

  template.innerHTML = `
            <div class="nav-btn ltBtn">
                <i class="fi"></i>
            </div>
            <div class="nav-btn midBtn">
                <i class="fi"></i>
            </div>
            <div class="nav-btn rtBtn">
                <i class="fi"></i>
        `;
  const container = template.content.cloneNode(true);

  return container;
}

export default renderNav;
