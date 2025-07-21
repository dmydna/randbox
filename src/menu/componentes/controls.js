function menuControls() {
  const keys = [
    { name: "m", type: "key", title: "menu" },
    { name: "space", type: "key", title: "lanzar caja" },
    { name: "", type: "title", title: "Seccion de preguntas" },
    { name: "", type: "title", title: "* teclado" },
    { name: "back", type: "key", title: "reinciar contador" },
    { name: "space", type: "key", title: "incrementar contador" },
    { name: "enter", type: "key", title: "enviar respuesta" },
    { name: "h", type: "key", title: "siguiente objeto" },
    { name: "", type: "title", title: "* botones" },
    { name: "refresh", type: "btn", title: "reinciar contador" },
    { name: "plus", type: "btn", title: "incrementar contador" },
    { name: "social-network", type: "btn", title: "enviar respuesta" },
  ];

  const template = document.createElement("template");

  template.innerHTML = `
    <section class="controls-submenu">
        <ul class="menu"></ul>
    </section>
    `;
  const container = template.content.cloneNode(true);
  const menuContainer = container.querySelector(".menu");
  const section = container.querySelector(".controls-submenu");

  keys.forEach(({ name, type, title }) => {
    let image = "";
    switch (type) {
      case "key":
        image = `<img src="/src/assets/img/keyboard/${name}.png">`;
        break;
      case "btn":
        image = `<i class="fi fi-rr-${name}"></i>`;
        break;
      case "title":
        title = `<b>${title}<b>`;
    }

    menuContainer.innerHTML += `
            <li> 
               <div>${title}</div> 
               <div style="display: flex; gap: 10px;">  
                 ${image}
               </div>
            </li>
        `;
  });

  return container;
}

export default menuControls;
