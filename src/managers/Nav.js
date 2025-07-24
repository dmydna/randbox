import { hoverFlatIcon } from "../utils/utils.js";
import EventManager from "./Events.js";

class Navbar extends EventManager {
  constructor(container) {
    super();
    this.container = container; // referencia al contenedor del navbar
    this.lt_btn = container.querySelector(".ltBtn");
    this.mid_btn = container.querySelector(".midBtn");
    this.rt_btn = container.querySelector(".rtBtn");
  }

  _createNav = (btns) => {
    btns.forEach(({id, ico , handler})=>{
      switch(id){
        case 3: 
         this._addEvent(this.rt_btn, 'click', handler) ; 
         this.rt_btn.firstElementChild.classList.add(ico); 
         break;
        case 2: 
         this._addEvent(this.mid_btn, 'click', handler) ;
         this.mid_btn.firstElementChild.classList.add(ico); 
         hoverFlatIcon(this.mid_btn, 'ss')
         break;          
        case 1: 
         this._addEvent(this.lt_btn, 'click', handler) ;
         this.lt_btn.firstElementChild.classList.add(ico); 
         break;  
      }
    })
  }

  _resetNav(){
    this.lt_btn.firstElementChild.className  = 'fi'
    this.mid_btn.firstElementChild.className = 'fi'
    this.rt_btn.firstElementChild.className  = 'fi'
    this._removeAllEvents();
  }

  _updateNav = (btn) =>{
    this._resetNav()
    this._createNav(btn)
  }

  _kill() {
    this._removeAllEvents();
  }

  show(bool = true) {
    if (!bool) {
      this.container.style.visibility = 'hidden'
      return;
    }
    this.container.style.visibility = 'visible'
    return;
  }
}

export default Navbar;
