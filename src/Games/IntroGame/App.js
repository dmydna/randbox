import EventManager from "../Events.js";
import {introKeyboard} from "../../Componentes/keyboard.js"
import App from "../../pages/AppMain.js";


class introGameApp extends EventManager{

  constructor(imgArray, intentos, tablero) {
    super()
    this.data = {};
    this.intentos = intentos
    this.intentosRestantes = intentos;
    this.preguntas = imgArray;
    this.estado = null;
    this.tablero = tablero
    this.barra = null
    this._init();
  }

  _init() {
    this.box = this.tablero.querySelector(".box");
    this.gift = this.tablero.querySelector(".gift");
    this.index = 0;    
    this.preguntas.forEach(src => { this.data[src] = 0} );

  }

  jugar() {
    this._addEvent(document, 'keydown', introKeyboard)
    this._addEvent(this.box, "animationstart", this.boxAnimationStart)
    this._addEvent(this.box, "animationend", this.boxAnimationEnd)
    this._addEvent(this.box, "click", this.manejarRespuestaUsuario)
  }

  endGame() {
    this.cambiarEstado({"endgame": true});
    this.box.addEventListener('animationend', ()=>{
      App.router('/quiz')
    }, {once: true} )
  }
  
  cambiarEstado(States){

    Object.entries(States).forEach(([State, bool] )=>{
      if(bool){
        this.estado = State
        document.body.classList.add(State);
      }else{
        document.body.classList.remove(State);
      }
    })

  }

  kill(){
    this._removeAllEvents()
  }

  boxAnimationStart = () => {
    this.cambiarEstado({'box-up' : true, 'box-down': false})
  };

  boxAnimationEnd = () => {
    this.cambiarEstado({'box-dow': true, 'box-up' : false, 'box-anim': false })
  };

  actualizarData() {
    const giftImgStr = this.preguntas[this.index];
    this.data[giftImgStr] = this.data[giftImgStr] ?? 0;
    this.data[giftImgStr]++;
    localStorage.setItem("preguntasQuiz", JSON.stringify(this.data));
    let memoria = JSON.parse(localStorage.getItem("memoria")) || {}
    localStorage.setItem("memoria", JSON.stringify({...memoria, preguntasDisponibles : this.preguntas}))
  }

  manejarRespuestaUsuario = () => {
    this.cambiarEstado({'playGame' : true})
    this.avanzarJuego();
    this.actualizarData();
    if (this.intentosRestantes == 0){
      this.salirAnimationEnd()
    }
  }

  salirAnimationEnd(){
    this._removeAllEvents()
    this.box.addEventListener("animationend", () =>  {
      setTimeout(()=>{ this.endGame() }, 500)
    },{once:true})
  }


  progreso(){
    let progreso = (((this.intentos - this.intentosRestantes+1) / this.intentos) * 100)
    if(this.intentosRestantes == 0){
      progreso = "100%"
    }
    return progreso
  }

  avanzarJuego = () => {
    if (!this.tablero.querySelector(".box-up")) {
      this.index = Math.floor(Math.random() * this.preguntas.length);
      this.cambiarEstado({"box-anim":true});
      this.gift.src = `src/assets/img/objects/${this.preguntas[this.index]}.png`;
      localStorage.setItem("preguntasQuiz", JSON.stringify(this.data));
      this.barra.style.width = `${this.progreso()}%`;
      this.intentosRestantes--;
    }
  };
}


export default introGameApp;