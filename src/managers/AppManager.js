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
    this.navbar;
    this.headerElem;
    this.content;
    this.preRender = null;
  }

  _init(){
    if(this.root && this.router){
      this.fastRender("menu");
      this.router();
    }
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
        this.paginaAtras  = pagew;
      }
    });
  }

  _siguiente = (name) => {
    const page = this.root.findChild(name);
    this.paginaActual = page;
    this.paginaAtras = page.parent;
  };

  back () {
    if (this.paginaActual == this.root) {
      return;
    }
    this.paginaAtras = this.paginaActual
    this.paginaActual = this.paginaAtras;
    this.fastRender(this.paginaActual.name)
  };

  renderPage = () => {
    const container = this.elem;
    document.body.className = "";
    const render = this.pageActual.render;
    container.appendChild(render(this));
  };

  setPreRender(callback){
    this.preRender = callback;
  }

  fastRender(name) {
    const node = this.root.findChild(name);
    const render = node.render;
    const container = this.content;

    this.headerElem.innerHTML = ''
    this.navbar._kill()
    this.paginaAtras  = this.paginaActual
    this.paginaActual = node;
    // actualiza estilos
    _updCssVars();

    container.innerHTML = "";
    document.body.className = "";
    document.documentElement.id = name;
    document.documentElement.className = "";

    if(this.preRender){
      this.preRender()
      this.preRender = null
    }

    container.appendChild(render(this));
  }
}

export default AppManger;
