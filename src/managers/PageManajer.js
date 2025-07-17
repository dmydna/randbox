import EventManager from "./Events";

class pageItem {

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
  
  
  
  
  class pageManager extends EventManager {
    constructor() {
      super()
      this.root;
      this.menuActual;
    }
  
    _createNode = (nodeData) => {
      const node = new pageItem( 
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
  
    _cambiarMenu = (name) => {
      const menu = this.root.findChild(name)
      this.menuActual = menu
    }
  
    _atras = () => {
      if(this.menuActual.parent){
        this.menuActual = this.menuActual.parent
      }
      
    }
  
  
  }


  export {pageItem, pageManager}
  