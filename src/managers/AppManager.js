import EventManager from './Events.js';



class pageItem {

    constructor(name,render) {
      this.name = name;
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
  
  
  
  
  class AppManger extends EventManager {
    constructor(elem) {
      super()
      this.root = new pageItem('root')
      this.paginaActual;
      this.paginaAtras;
      this.estado;
      this.elem = elem
      this.memoria = {}
      this.router = null
    }
    

    _createApp(array){
      array.forEach( ({ id, render }, index) => {
        const pagew = new pageItem(id, render)
        this.root.addChild(pagew)
        this.router("/"+id, ()=>{ this.fastRender(id) })
        if(index == 0){
          this.paginaActual = pagew
          this.paginaAtras  = pagew
        }
      });
      this.fastRender('menu')
      this.router();
    }  

    _siguiente = (name) => {
      const page = this.root.findChild(name)
      this.paginaActual = page
      this.paginaAtras =  page.parent
    }
  
    _atras = () => {
      const paginaAtras = this.paginaAtras
      const paginaActual = this.paginaActual
      this.paginaActual = paginaAtras
      if(this.paginaActual == this.root){
        this.paginaActual.parent = this.root
        return
      }
      this.paginaAtras = paginaAtras.parent
  
    }

    renderPage = () => {
      const container = this.elem
      document.body.className = ''
      const func = this.pageActual.render
      container.appendChild(func(this))
    }

    fastRender(name){
      const container = this.elem
      container.innerHTML = '' 
      document.body.className = ''
      document.documentElement.className = name
      const node = this.root.findChild(name)
      const func = node.render
      container.appendChild(func(this))
    }
  
  }
  



export default AppManger