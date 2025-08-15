import EventManager from "./Events";

class menuNode {

  constructor(name, render, data=null) {
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

class NavigationMenu extends EventManager {
  
  constructor() {
    super();
    this.root;
    this.currentMenu;
  }


  _init(nodeData){
    this.root = this._createNode(nodeData)
    this.currentMenu = this.root
  }

  _createNode = (nodeData) => {
    const node = new menuNode(nodeData.name, nodeData.render, nodeData.estado);
    if (nodeData.children) {
      nodeData.children.forEach((childData) => {
        const childNode = this._createNode(childData);
        node.addChild(childNode);
      });
    }
    return node;
  };

  _goTo = (name) => {
    const found = this.root.findChild(name);
    if(found){
      this.currentMenu = found;
      return true
    }return false
  };

  _back = () => {
    if (this.currentMenu.parent) {
      this.currentMenu = this.currentMenu.parent;
      return true
    } return false
  };

}

export { NavigationMenu, menuNode };

