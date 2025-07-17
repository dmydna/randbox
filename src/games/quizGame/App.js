import { src_obj } from "../../utils/default.js";
import App from "../../AppMain.js";
import EventManager from "../../managers/Events.js";
import memory from "../../managers/Memory.js";
import JuegoQuiz from "./Game.js";



// Maneja la interfaz del juego
// JuegoQuizUI -> JuegoQuiz -> Quiz

class QuizApp extends EventManager{
  constructor(preguntas, cantVidas, gameElem) {
    super();
    this.estado = null;
    this.juego = new JuegoQuiz(preguntas, cantVidas);
    this.respuestaActual = 0;
    this.preguntas = Object.keys(preguntas)
    this.resumen = false
    this._tablero = gameElem

  }

  createApp(Componentes){
    this._animations =  Componentes['_animations'] 
    this._controlls  =  Componentes['_controls']  
    this._popup      =  Componentes['_popup']      
    this._progress   =  Componentes['_progress']   
  }

  _init(){
    this.box = this._tablero.querySelector(".box");
    this._animations._init(this.preguntas, this.box)
    this._popup._init(this)
    this.puntos = this._tablero.querySelector(".points");
    this.respUser = this._tablero.querySelector(".user-reply");    
    this.respUser.innerHTML = 0
  }

  iniciarJuego() {

    const navContent = [
      {id: 1, ico : 'fi-br-refresh', handler: this.AnswerReset},
      {id: 2, ico : 'fi-rr-social-network', handler: this.manejarRespuestaUsuario},
      {id: 3, ico : 'fi-br-plus', handler: this.AnswerInc}
    ]
    
    this._controlls._createNav(navContent)
    // incializa la primer pregunta
    this.box.src = this.__srcHandler(this.juego.obtenerPreguntaActual());
    this._addEvent(this.respUser, "click", this.AnswerInc);
    this._addEvent(this.box, "click", this.avanzarJuego);
    this._addEvent(this._popup.btn, "click", this.terminarPartida);
  }

  _animarInicio(){
    document.onload = document.body.classList.add("onload")
    this.box.addEventListener('animationend', ()=>{ 
      document.body.classList.remove('onload')
    }, {once :true})
  }

  AnswerInc =() => {
    this.respUser.innerHTML++;
    if( this.resumen ){
      this.recordar()
    }

  }

  AnswerReset = () => {
    this.respUser.innerHTML = 0
  }

  recordar = () => {

    memory._setMemory("memoria", {
      ...this.juego.recordar(),
      respuesta: this.respUser.innerHTML,
      estado: this.estado 
    })
    
  }

  async cambiarEstado(newState) {

    // elimina estado anterior y actualiza
    const oldState = this.estado;
    document.body.classList.remove(oldState);
    if (newState == null) {
      return;
    }
    this.estado = newState;
    document.body.classList.add(newState);
    this._popup.actualizar();

    if( this.resumen ){
      this.recordar()
    }

    return;
  }


  kill() {
    this._removeAllEvents()
    this._controlls._removeAllEvents()
  }

  salir(){
    /* salir a pagina de score */
    document.body.classList.add("slide-out-left");
    // document.body.classList.add("animate__animated","animate__fadeOutLeft");
    document.body.addEventListener(
      "animationend",
      () => {
        this.cambiarEstado()
        this._popup.show(false)
        this.kill()
        App.router('/score')
      },
      { once: true }
    );
 
  }

  reanudarPartida(memoria){

    if(memoria.estado == "_"){
    // importante: caso base de la recursion
      return
    }

    if(this.resumen){
      if(memoria.estado == 'user-loses'){
        this.cambiarEstado('user-loses')
        this._popup.show()
      }else if(memoria.estado == 'user-wins'){
        this.cambiarEstado('user-wins')
        this._popup.show()
      }

      for(let i=0; i < this.juego.intentosRestantes - memoria.vidas; i++ ){
        this._popup.quitarCorazones()
      }
      
      let preguntaActual = this.juego.obtenerPreguntaActual() 
      if(!preguntaActual){
        preguntaActual = this.juego.siguientePregunta() 
      }  
      this.juego.retomarPartida(memoria)
      this._progress.style.width = `${memoria.progreso}%`
      this.box.src = this.__srcHandler(this.juego.obtenerPreguntaActual());
      this.respUser.innerHTML = memoria.respuesta 
      this.estado = memoria.estado

    }
  }

  terminarPartida = () => {
    if (this.estado == "user-loses") {
      this.jugarOtraVez();
    }
    if (this.estado == "user-wins") {
      this.salir()
    }
  };

  async jugarOtraVez() {
    this.juego.intentarDeNuevo();
    this.cambiarEstado("user-restart-game");
    await this._popup.reiniciar(); 
    // REINCIAR JUEGO
    this.AnswerReset();
    this._progress.style.width = 0;
    this.box.src = this.__srcHandler(this.juego.obtenerPreguntaActual());
    this.cambiarEstado();
    this._popup.show(false);
    // this.resumen = false
  }

  userPierde() {
    this.cambiarEstado("user-loses");
  }

  userGana() {
    this.cambiarEstado("user-wins");
  }

  userRespondeBien() {
    this.puntos.innerHTML = `+ ${this.juego.incPuntaje()}`;
    this._progress.style.width = `${this.juego.getProgreso()}%`;
    this.cambiarEstado("user-reply-succeeded");
    this.userRespondeTimeout();
  }

  userRespondeMal() {
    this.AnswerReset()
    this.puntos.innerHTML = `- ${this.juego.decPuntaje()}`;
    this.cambiarEstado("user-reply-failed");
    this.userRespondeTimeout();
  }

  verificarRespuestaUsuario() {
    return this.juego.verificarRespuesta(this.respuestaActual);
  }

  userRespondeTimeout() {
    setTimeout(() => {
      this.cambiarEstado();
      this._popup.show(false);
    }, 1200);
  }


  avanzarJuego = () => {
    const shuffleImgs = this._animations;
    this.AnswerReset(); // cantAp -> 0

    if (this.juego.haTerminado()) {
      /* Si el juego termina no cambia de pregunta */
      return false;
    }
    /* Pasa a la sig pregunta con una animacion shuffle*/
    if (shuffleImgs) {
      document.body.style.pointerEvents = "none";
      // incia la animacion y ejecuta una funcion handler al finalizar
      shuffleImgs.shuffleAnimate(() => {
        document.body.style.pointerEvents = "auto";
        return this.juego.siguientePregunta(); //importante
      }, 2000); /*importante shuffleImg es infinito por default*/
    } else {
      /* por default pasa a la sig pregunta */
      this.box.src = this._srcHandler(this.juego.siguientePregunta());
    }
    this.guardarScore()
    return true;
  };

  __srcHandler(respuesta) {
    return src_obj + `${respuesta}.png`;
  }

  manejarRespuestaUsuario = () => {
    this.respuestaActual = this.respUser.innerHTML;
    this._popup.show(true);
    if (this.verificarRespuestaUsuario()) {
      if (!this.juego.haTerminado()) {
        this.userRespondeBien();
        this.avanzarJuego();
      } else {
        this.finDelJuego(); 
      }
    } else {
      if (!this.juego.haTerminado()) {
        this.userRespondeMal(); 
      } else {
        this.finDelJuego(); 
      }
    }
  };

  finDelJuego() {
    if (this.juego.haPerdido()) {
      this.userPierde(); 
    } else {
      this.userGana(); 
    }
    this.guardarScore()
  }
  guardarScore(){
    memory._setMemory("score", this.juego.puntaje)
  }
}


// TODO :
// crear gameManager General que se encarga de pasar informacion
// cuando el juego termino


export default QuizApp;
