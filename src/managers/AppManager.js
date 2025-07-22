import EventManager from "./Events.js";
import { _updCssVars } from "../menu/componentes/utils.js";
import { pageItem } from "./PageManajer.js";

class AppManger extends EventManager {
  constructor(elem) {
    super();
    this.root = new pageItem("root");
    this.paginaActual;
    this.paginaAtras;
    this.estado;
    this.elem = elem;
    this.memoria = {};
    this.router = null;
  }

  _createApp(array) {
    array.forEach(({ id, render }, index) => {
      const pagew = new pageItem(id, render);
      this.root.addChild(pagew);
      this.router("/" + id, () => {
        this.fastRender(id);
      });
      if (index == 0) {
        this.paginaActual = pagew;
        this.paginaAtras = pagew;
      }
    });
    this.fastRender("menu");
    this.router();
  }

  _siguiente = (name) => {
    const page = this.root.findChild(name);
    this.paginaActual = page;
    this.paginaAtras = page.parent;
  };

  _atras = () => {
    const paginaAtras = this.paginaAtras;
    const paginaActual = this.paginaActual;
    this.paginaActual = paginaAtras;
    if (this.paginaActual == this.root) {
      this.paginaActual.parent = this.root;
      return;
    }
    this.paginaAtras = paginaAtras.parent;
  };

  renderPage = () => {
    const container = this.elem;
    document.body.className = "";
    const render = this.pageActual.render;
    container.appendChild(render(this));
  };

  fastRender(name) {
    const node = this.root.findChild(name);
    const render = node.render;
    const container = this.elem;

    this.paginaActual = node;
    // actualiza estilos
    _updCssVars();

    container.innerHTML = "";
    document.body.className = "";
    document.documentElement.id = name;

    container.appendChild(render(this));
  }
}

export default AppManger;
