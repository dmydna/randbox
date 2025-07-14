// TODO:
import EventManager from "../Games/Events.js";
import { _updCssVars } from "./sections/utils.js";




class MenuItem {


  constructor(name, data ,render) {
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



  _createNode = (nodeData) => {
    const node = new MenuItem( 
      nodeData.name, 
      nodeData.estado, 
      nodeData.render
    );  
    if (nodeData.children) {
      nodeData.children.forEach(childData => {
        const childNode = this._createNode(childData);
        node.addChild(childNode);
      });
    }
    return node;
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


  _createMenu = (menuData) => {
    this.root = new MenuItem('root')

    this.root = this._createNode(menuData)

    this.menuActual = this.root;
    this.menuAtras = this.root;

    const navContent = [
      {id: 1, ico : 'fi-rr-angle-left', handler: this.atras},
      {id: 2, ico : 'fi-rr-home',       handler: this.home},
      {id: 3, ico : 'fi-rr-info',       handler: this._siguiente}
    ]
    this.nav._createNav(navContent)
    
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

  const game  = this._loadMemory()
  const config = game.opciones
  _updCssVars(config)


  if(document.querySelector('.continue-btn') && config.memoria != {}){
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
  if(game.opciones['menu'] == 0 && document.querySelector('.onload')){
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
