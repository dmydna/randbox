import { pageManager } from "../managers/PageManajer.js";

class Menu extends pageManager {
  constructor(elem) {
    super();
    this.root = null;
    this.elem = elem.querySelector(".popup");
    this.levels = [];
    this.nav = null;
    this.estado = "hidden";
    this.box ;
  }

  animarInicio() {
    // document.onload = document.body.classList.add("onload");
    if(document.body.classList.contains("onload")){
      this.box.addEventListener(
        "animationend",() => {document.body.classList.remove("onload");},
        { once: true }
      );
    }
  }


  createMenu = (menuData) => {
    this.root = this._createNode(menuData);
    this.menuActual = this.root;

    const navContent = [
      { id: 1, ico: "fi-rr-angle-left", handler: this.atras },
      { id: 2, ico: "fi-rr-settings-sliders", handler: this.home },
      { id: 3, ico: "fi-rr-angle-right", handler: this._siguiente },
    ];
    this.nav._updateNav(navContent);
  };

  killmenu() {
    document.body.classList = "";
  }

  cambiarMenu = (name) => {
    this.showMenu(true)
    this._cambiarMenu(name);
    const newMenu = this.menuActual.data;
    if (this.menuActual != this.root) {
      const oldMenu = this.menuActual.parent.data;
      document.body.classList.remove(oldMenu);
      document.body.classList.remove(this.root.data);
    }
    document.body.classList.add(newMenu);
    this.renderMenu();
  };
  atras = () => {
    if (this.menuActual.parent) {
      const newMenu = this.menuActual.parent.data;
      const oldMenu = this.menuActual.data;
      document.body.classList.add(newMenu);
      if (newMenu != oldMenu) {
        document.body.classList.remove(oldMenu);
      }
    }
    this._atras(); // actualizo struct
    this.renderMenu();
  };

  home = () => {
    if (this.menuAtras) {
      document.body.classList.remove(this.menuAtras.data);
    }
    document.body.classList.remove(this.menuActual.data);
    document.body.classList.add(this.root.data);
    this.menuActual = this.root;
    this.renderMenu();
  };

  cambiarEstado(newState) {
    const oldState = this.menuActual.data;
    document.body.classList.remove(oldState);
    document.body.classList.add(newState);
  }

  renderMenu = () => {
    const container = this.elem;
    container.innerHTML = "";
    const func = this.menuActual.render;
    container.appendChild(func(this));
  };

  showMenu(bool = true) {
    if (bool) {
      document.body.classList.add("popup-active");
      document.body.classList.add(this.root.data);
    } else {
      document.body.classList.remove(this.root.data);
      document.body.classList.remove("popup-active");
      this.elem.style.display = "none";
    }
  }
}

export default Menu;
