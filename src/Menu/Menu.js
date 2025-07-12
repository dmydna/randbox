// TODO:
import EventManager from "../Games/Events.js";

import menuControls from './sections/controls.js';
import menuHelp from './sections/help.js';
import menuMain from './sections/main.js';
import menuOptions from './sections/options.js';
import menuTutorial from './sections/tutorial.js';
import Nav from '../Componentes/Nav.js'




class MenuItem {


  constructor(data, name=null,render=null) {
    this.name = name;
    this.data = data;
    this.render = render
    this.children = [];
    this.parent = null;
  }

  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  findChild(name) {
    if (this.name === name) {
      return this;
    }

    for (let child of this.children) {
      const found = child.findChild(name);
      if (found !== null) {
        console.log(found)
        return found;
      }
    }
    return null;
  }
}




class Menu extends EventManager {
  constructor() {
    super()
    this.root;
    this.menuActual;
    this.menuAtras;
  }

  _siguiente = (name) => {
    const menu = this.root.findChild(name)
    this.menuActual = menu
    this.menuAtras =  menu.parent

  }

  _atras = () => {
    const menuAtras = this.menuAtras
    const menuActual = this.menuActual
    this.menuActual = menuAtras
    if(this.menuActual == this.root){
      this.menuAtras = this.root
      return
    }
    this.menuAtras =  menuAtras.parent
  }


}


class MenuApp extends Menu{
    constructor(elem) {
    super()
    this.elem = elem.querySelector('.popup')
    this.levels = []
    this.nav = null
    this.estado = 'hidden'
  }

  _init() {
    // ndde -> {estado, name, render}
    this.root = new MenuItem('main-menu-active', 'main-menu', menuMain);
    // root -> menus
    const root_continue = new MenuItem('continue-menu-active','continue');
    const root_play     = new MenuItem('play-game', 'play');
    const root_options  = new MenuItem('options-menu-active', 'options', menuOptions);
    const root_help     = new MenuItem('help-menu-active', 'help', menuHelp);
    // root -> help -> menus
    const _help_tutorial = new MenuItem('resumen-submenu-active' , 'tutorial', menuTutorial);
    const _help_controls = new MenuItem('controls-submenu-active', 'controls', menuControls);

    root_help.addChild(_help_tutorial);
    root_help.addChild(_help_controls);

    this.root.addChild(root_continue);
    this.root.addChild(root_play);
    this.root.addChild(root_options);
    this.root.addChild(root_help);

    this.menuActual = this.root;
    this.menuAtras = this.root;

    


    // Barra de Navegacion 

    this.nav._btnEvent('Left','click', this.atras)
    this.nav._btnEvent('Middle','click', this.home)
    this.nav._btnEvent('Right','click', this._siguiente)
    this.nav._addIcons(['fi-rr-angle-left','fi-rr-home','fi-rr-info'])

    console.log(this.menuActual)
    
    if(this.estado == 'visible'){
      this.renderMenu()
    }

  }


  killmenu(){
    document.body.classList = ""
  }

  _estadoNode(node){
    return node.name+'-menu-active'
  }

  cambiarMenu = (name) => {
    this._siguiente(name)
    const oldState = this.menuAtras.data
    const newState = this.menuActual.data
    document.body.classList.remove(oldState)
    document.body.classList.add(newState)
    // this.menuActual.render
    this.renderMenu()  
  }
  atras = () => {
    const newMenu =  this.menuAtras.data
    const oldMenu = this.menuActual.data
    document.body.classList.add(newMenu)
    if(newMenu != oldMenu){
      document.body.classList.remove(oldMenu)
    }
    if(this.menuActual == this.root){
      this._aplicarConfiguracionDelJuego()
    }
    this._atras() // actualizo struct
    this.renderMenu()


  }
  home = () => {
    if(this.menuAtras){
      document.body.classList.remove(this.menuAtras.data)
    }
    document.body.classList.remove(this.menuActual.data)
    document.body.classList.add(this.root.data)
    this.menuActual = this.root
    this.renderMenu()
  }

  cambiarEstado(newState){
    const oldState = this.menuActual.data
    document.body.classList.remove(oldState)
    document.body.classList.add(newState)
  }

  renderMenu = () => {
    const container = this.elem
    container.innerHTML = '' 
    const func = this.menuActual.render
    container.appendChild(func(this))
  }

  showMenu(bool=true){
    if(bool){
      document.body.classList.add('popup-active')
      document.body.classList.add(this.root.data)
    }else{
      document.body.classList.remove(this.root.data)
      document.body.classList.remove('popup-active')
      this.elem.style.display = 'none'
    }
  }


 _aplicarConfiguracionDelJuego(){

  const config  =  JSON.parse(localStorage.getItem("GameConfig")) || {}

  const html =  document.documentElement

  html.style.setProperty('--progress-enable',  config.progreso * 0.5)
  html.style.setProperty('--menu-enable', config.menu)
  html.style.setProperty('--animation-time', (-1) * config.velocidad + 5.5 + 's' )
  html.style.setProperty('--hearts', config.vidas)
  html.style.setProperty('--continue-game', (config.memoria == 0) ? 'none' : 'flex')

  if(document.querySelector('.continue-btn') && config.memoria != {}){
    console.log("Se activa")
    if(config.memoria == 0){
      document.querySelector('.continue-btn').style.display = 'none'
    }else{
      document.querySelector('.continue-btn').style.display = 'flex'
    }
  }


  if(document.querySelector('.main-menu-active')){
    // this.renderMenu()
    this.estado = 'visible'
    return
  }
  if(config['menu'] == 0 && document.querySelector('.onload')){
    // incia el juego sin menu
    // const introGame = new introGame(gift_img, config['vidas']);
    this.estado = 'hidden'
    return true
    // Game.jugar()
  }else 
   if(document.querySelector('.onload')){
    // incia menu
    // el Menu inicia el juego
    this.estado = 'visible'
    // this.renderMenu()
    // this.showMenu(true)


    } 
    return false
  }
}





export default MenuApp;
