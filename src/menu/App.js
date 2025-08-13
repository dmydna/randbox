import { NavigationMenu } from "../managers/NavigationMenu.js";

class Menu  {
  constructor() {
    this.menu  = new NavigationMenu()
    this.elem  
    this.nav   
    this.box       
    this.estado = "root"
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

  init({elem, nav, box}){
    this.elem = elem
    this.nav = nav 
    this.box = box
    this.nav._updateNav([
      { id: 1, ico: "fi-rr-angle-left",       handler: this.back },
      { id: 2, ico: "fi-rr-settings-sliders", handler: this.home },
      { id: 3, ico: "fi-rr-angle-right" },
    ]);
  }

  createMenu = (menuData) => {
    this.menu._init(menuData);
    this.refresh()
  };

  refresh(){
    document.body.classList.remove(this.currentMenu);     // old-menu
    this.currentMenu = this.menu?.currentMenu?.data       // update-menu
    document.body.classList.add(this.currentMenu);        // new-menu

  }


  changeMenu = (name) => {
    if(this.menu?._goTo(name)){
      this.refresh()
      this.showMenu(true)
      this.render();
    }
  };

  back = () => {
    if(this.menu?._back()){
      this.refresh()
      this.render();
    }
  };


  home = () => {
    if(this.menu){
      this.menu.currentMenu = this.menu.root
      this.refresh()
      this.render();
    }
  };


  render = () => {
    const container = this.elem;
    container.innerHTML = "";
    const render = this.menu.currentMenu.render;
    container.appendChild(render(this));
  };

  showMenu(bool = true) {
    if (bool) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
      this.elem.style.display = "none";
    }
  }
}

export default Menu;
