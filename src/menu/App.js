// TODO:
import memory from "../managers/Memory.js";
import { pageManager } from "../managers/PageManajer.js";
import { _updCssVars } from "./componentes/utils.js";



class Menu extends pageManager{
    constructor(elem) {
    super()
    this.root = null
    this.elem = elem.querySelector('.popup')
    this.levels = []
    this.nav = null
    this.estado = 'hidden'
  }


  _createMenu = (menuData) => {

    this.root = this._createNode(menuData)
    this.menuActual = this.root;
    
    const navContent = [
      {id: 1, ico : 'fi-rr-angle-left',       handler: this.atras},
      {id: 2, ico : 'fi-rr-settings-sliders', handler: this.home},
      {id: 3, ico : 'fi-rr-angle-right',             handler: this._siguiente}
    ]
    this.nav._createNav(navContent)
    this.renderMenu()
  }

  killmenu(){
    document.body.classList = ""
  }

  _estadoNode(node){
    return node.name+'-menu-active'
  }

  cambiarMenu = (name) => {

    this._cambiarMenu(name)

  
    const newMenu = this.menuActual.data
    if(this.menuActual !=  this.root){
      const oldMenu = this.menuActual.parent.data
      document.body.classList.remove(oldMenu)
    }
    document.body.classList.add(newMenu)


 
    // this.menuActual.render
    this.renderMenu()  
  }
  atras = () => {

    if(this.menuActual.parent){
      const newMenu =  this.menuActual.parent.data
      const oldMenu = this.menuActual.data
      document.body.classList.add(newMenu)
      if(newMenu != oldMenu){
        document.body.classList.remove(oldMenu)
      }
    }
    this._atras() // actualizo struct
    this.renderMenu()
    if(this.menuActual == this.root){
      this._aplicarConfiguracionDelJuego()
    }


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

  const config  = memory.get('opciones')
  
  _updCssVars()

  if(config.menu == 0 && document.querySelector('.onload')){
    this.estado = 'hidden'
    return true
  }else 
   if(document.querySelector('.onload')){
    this.estado = 'visible'
    } 
    return false
  }
}





export default Menu;
