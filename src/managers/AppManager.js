import { updateCssVars } from "../menu/componentes/utils.js";
import EventManager from "./Events.js";
import Navigation from "./NavigationApp.js";


/*Nota:
La navegacion tiene 3 tipos ( external, jump, lineal )
*external: Cuando se rutea desde barra de direcciones
Cuando se rutea desde la ui de la app (ej navbar, href) 
es de tipo implicito internal:
 - *jump: cuando se rompe el orden de las paginas (ej. rutear con href)
 - *lineal: cuando se rutea con forward, back 
 */


class AppManger extends EventManager {
  constructor(elem) {
    super();
    this.navigation = new Navigation()
    this.container  = elem;
    this.router     = null;
    this.navbar     = null;
    this.headerElem = null;
    this.content    = null ;
    this.preRender  = null;
  }

  _init(){
    if(this.navigation && this.router){
      this.goTo('menu')
      this.router.start() // this.router();
    }
  }


  _createApp(array) {
    array.forEach(({ id, render }) => {
      const node = this.navigation.add(id);
      node.render = render
      this.router("/" + id, () => {
        this.goTo(id);
      });
    });
  }

  forward () {
    if(this.navigation.forward()){
      this.navigationType = 'lineal'
      this.refresh()
    };
  };

  home () {
    this.navigationType = 'jump'
    this.navigation.current = this.navigation.head
    this.refresh()
  }

  back () {
    if(this.navigation.back()){
      this.navigationType = 'lineal'
      this.refresh()
    }
  };

  refresh(){
    this.paginaAtras  =  this.paginaActual;
    this.paginaActual = this.navigation.current;
    if(this.navigationType == 'lineal' ||
      this.navigationType == 'jump'){
      history.pushState(null, '', this.navigation.current.url);
    }
    this.fastRender(this.paginaActual.url)

  }

  resume(resumeTo){
    this.navigationType = 'jump'
    if(resumeTo){
      this.goTo(resumeTo)
    }else{
      this.goTo(this.paginaAtras.url)
    }
  }

  jump(id){
    this.navigationType = 'jump'
    this.goTo(id)
  }
  
  goTo(id){
    const found = this.navigation.find(id)
    if(found){
      this.navigation.current = found
      this.refresh()
    }else{
      console.error('no existe ruta:', id)
    }
  }

  navigationEvent() {

    const type    = this.navigationType ?? "external"
    const fromUrl = this.paginaAtras?.url ?? "";
    const toUrl   = this.paginaActual?.url ?? "";
  
    document.dispatchEvent(new CustomEvent("navigation", {
      detail: {
        type, // "lineal" | "external" | "jump" .
        from: `/${fromUrl}`,
        to: `/${toUrl}`
      }
    }));

    this.navigationType = null
  }

  setPreRender(callback){
    this.preRender = callback;
  }

  fastRender() {
    this.navigationEvent()

    const node      = this.navigation.current;
    const container = this.content;

    this.headerElem.innerHTML = ''
    this.navbar._kill()

    updateCssVars();

    container.innerHTML = "";
    document.body.className = "";
    document.documentElement.id = node.url;
    document.documentElement.className = "";

    if(this.preRender){
      this.preRender()
      this.preRender = null
    }

    container.appendChild(node.render(this));


  }
}

export default AppManger;
