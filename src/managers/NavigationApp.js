class PageNode {
  constructor(url) {
    this.url    = url;
    this.render = null;
    this.prev   = null;
    this.next   = null;
  }
}

class NavigationApp {
  constructor() {
    this.head = null;
    this.current = null; // nodo actual
  }

  find(url) {
    let node = this.head;
    if (node?.url == url) return node;
    if(this.current?.url == url){
      return this.current
    }
    while (node && node.next) {
      node = node.next;
      if (node.url == url) return node;
    }
    return null;
  }

  add(url) {
    const newNode = new PageNode(url);

    if (!this.head) {
      this.head = this.current = newNode;
    } else {
      if (this.current.next) {
        this.current.next = null;
      }

      newNode.prev = this.current;
      this.current.next = newNode;
      this.current = newNode;
    }

    return newNode
  }

  back() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      console.log(`Atrás a: ${this.current.url}`);
      return true
    } else {
      console.log("No hay página anterior.");
      return false
    }
  }

  forward() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      console.log(`Adelante a: ${this.current.url}`);
      return true
    } else {
      console.log("No hay página siguiente.");
      return false
    }
  }

  showCurrent() {
    if (this.current) {
      console.log(`Página actual: ${this.current.url}`);
    } else {
      console.log("No hay página cargada.");
    }
  }
}

export default NavigationApp;
