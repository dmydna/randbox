function menuHelp(menu) {
  const container = document.createElement("section");
  container.classList.add("help-menu");

  container.innerHTML = /*html*/ `
     <ul class="menu">
        <li class="tutorial-ref" >
           <i class="fi fi-rr-play"></i>como jugar?
        </li>
        <li class="controls-ref" > 
          <i class="fi fi-rr-settings"></i>ver controles
        </li>
     </ul>
    `;
  const li_tutorial = container.querySelector(".tutorial-ref");
  const li_controls = container.querySelector(".controls-ref");

  li_controls.addEventListener("click", () => menu.cambiarMenu("controls"));
  li_tutorial.addEventListener("click", () => menu.cambiarMenu("tutorial"));

  return container;
}

export default menuHelp;
