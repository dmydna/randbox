import EventManager from "./Events.js";

class Navbar extends EventManager {

    constructor(element) {
      super()
      this.element = element; // referencia al contenedor del navbar
      this.mode = null;       // 'navigation' o 'game'
      this.lt_btn = element.querySelector('.ltBtn');
      this.mid_btn = element.querySelector('.midBtn');
      this.rt_btn =element.querySelector('.rtBtn');
    }
  

    _createNav = (btns) => {
      btns.forEach(({id, ico , handler})=>{
        switch(id){
          case 3: 
           this._addEvent(this.rt_btn, 'click', handler) ; 
           this.rt_btn.firstElementChild.classList.add(ico); break;
          case 2: 
           this._addEvent(this.mid_btn, 'click', handler) ;
           this.mid_btn.firstElementChild.classList.add(ico); break;          
          case 1: 
           this._addEvent(this.lt_btn, 'click', handler) ;
           this.lt_btn.firstElementChild.classList.add(ico); break;  
        }
      })
    }


    _addEvent_Left(handler, event=null){
      if(event == null){
        this._addEvent(this.lt_btn ,'click', handler)
      }else{
        this._addEvent(this.lt_btn , event, handler)
      }

    }

    _addEvent_Right(handler, event=null){
      if(event == null){
        this._addEvent(this.rt_btn ,'click', handler)
      }else{
        this._addEvent(this.rt_btn , event, handler)
      }

    }

    _addEvent_Middle(handler, event=null){
      if(event == null){
        this._addEvent(this.mid_btn ,'click', handler)
      }else{
        this._addEvent(this.mid_btn ,event, handler)
      }
    }

    _addIcons(icons){
      const  navBtn = this.element.querySelectorAll('.nav-btn i')
      navBtn.forEach((boton, index)=>{
        boton.classList.add(icons[index])
      })
    }

    _btnEvent(buton,event,handler){
      const  [left, middle, right] = this.element.querySelectorAll('.nav-btn')
      if(buton.toLowerCase() == 'left'){
        this._addEvent(left,event, handler)
      }else if(buton.toLowerCase() == 'middle'){
        this._addEvent(middle,event, handler)
      }else if(buton.toLowerCase() == 'right'){
        this._addEvent(right,event, handler)
      }
    }
 
  
    _hook(game){
      this.hookObject = game
    }

 
    _kil(){
      this._removeAllEvents()
    }

    show(bool=true){
      if(!bool){
        document.body.classList.add("nav-hide")
        return
      }  
      document.body.classList.remove("nav-hide")
        return
    }
  }


export default Navbar