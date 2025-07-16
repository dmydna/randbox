import EventManager from "../Events.js";
import {introKeyboard} from "../../Componentes/keyboard.js"
import App from "../../pages/AppMain.js";
import memory from "../Memory.js";


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
        console.log('render quiz')
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
    this.cambiarEstado({ 
      'box-up' : true, 
      'box-down': false,
      'box-anim': true
    })
  };

  boxAnimationEnd = () => {
    this.cambiarEstado({
      'box-up' :  false,
      'box-down': true,
      'box-anim': false
    })
    if(this.intentosRestantes == 0){
      this.endGame()
    }
  };

  actualizarData() {
    const giftImgStr = this.preguntas[this.index];
    this.data[giftImgStr] = this.data[giftImgStr] ?? 0;
    this.data[giftImgStr]++;

    memory._setMemory("partida", this.data)
    memory._setMemory("memoria", {
      ...memory._getMemory('memoria'), 
      preguntasDisponibles : this.preguntas
    } )
  }

  manejarRespuestaUsuario = () => {
    console.log(this.intentosRestantes)
    if(this.intentosRestantes == 0){
      this._removeAllEvents()
      return
    }
    this.cambiarEstado({'playGame' : true})
    this.avanzarJuego();
    this.actualizarData();

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
      this.cambiarEstado({"box-anim":true, "box-down":false});
      this.gift.src = `src/assets/img/objects/${this.preguntas[this.index]}.png`;
      this.barra.style.width = `${this.progreso()}%`;
      this.intentosRestantes--;
      memory._setMemory("partida", this.data)
    }
  };
}


export default introGameApp;