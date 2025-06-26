import { ShuffleImgsAnim } from "./ShuffleImgs.js";
import { JuegoQuiz } from "./JuegoQuiz.js";
import {
  actualizarPopup,
  crearCorazones,
  quitarCorazones,
  recargarVida,
  recargarVidaAnimacion,
  resetearJuegoAnimacion,
} from "./popupQuiz.js";

// Maneja la interfaz del juego
// JuegoQuizUI -> JuegoQuiz -> Quiz

class QuizApp {
  constructor(preguntas, cantVidas) {
    this.estado = null;
    this.juego = new JuegoQuiz(preguntas, cantVidas);
    this.respuestaActual = 0;
    this.nuevojuego(preguntas);
  }

  nuevojuego(preguntas) {
    this.box = document.querySelector(".box");
    this.shuffleImgs = new ShuffleImgsAnim(Object.keys(preguntas), this.box);
    this.puntos = document.querySelector(".points");
    this.popup = document.querySelector(".popup");
    this.popupImg = document.querySelector(".popup-ico");
    this.popupBtn = document.querySelector(".popup-btn");
    this.barraCorrazones = document.querySelector(".heart-bar");
    this.barraProgreso = document.querySelector(".progress-bar");
    this.cantidadApariciones = document.querySelector(".user-reply");
    this.corazones = crearCorazones.bind(this)();
    this.quitarCorazones = quitarCorazones.bind(this);
    this.actualizarPopup = actualizarPopup.bind(this);
    this.resetearJuegoAnimacion = resetearJuegoAnimacion.bind(this);
    this.recargarVidaAnimacion = recargarVidaAnimacion.bind(this);
    this.recargarVida = recargarVida.bind(this);
  }

  iniciarJuego() {
    const checkBtn = document.querySelector(".midBtn");
    const resetBtn = document.querySelector(".ltBtn");
    const plusBtn = document.querySelector(".rtBtn");
    const cantAp = document.querySelector(".user-reply");

    // incializa la primer pregunta
    this.box.src = `src/img/objects/${this.juego.obtenerPreguntaActual()}.png`;

    /* navFooter eventos  */
    checkBtn.addEventListener("click", this.manejarRespuestaUsuario);
    resetBtn.addEventListener("click", (e) => {
      cantAp.innerHTML = "0";
    });
    plusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cantAp.innerHTML++;
    });

    /* randbox eventos */
    cantAp.addEventListener("click", (e) => {
      cantAp.innerHTML++;
    });
    this.box.addEventListener("click", this.avanzarJuego);

    /* popup eventos */
    this.popupBtn.addEventListener("click", () => {
      if (this.estado == "user-loses") {
        /* Reiniciar juego */
        this.jugarOtraVez();
      }
      if (this.estado == "user-wins") {
        /* ver score */
        document.body.classList.add("slide-out-left");
        document.body.addEventListener("animationend", () => {
          window.location.href = "../score.html";
        });
      }
    });
  }

  // eliminarEventos() {
  //   this.checkBtn.removeEventListener('click' , this.manejarRespuestaUsuario )
  //   this.box.removeEventListener('click', this.avanzarJuego );
  // }

  resetearJuego() {
    this.barraProgreso.style.width = `${this.juego.getProgreso()}%`;
    this.cantidadApariciones.innerHTML = "0";
    this.box.src = `src/img/objects/${this.juego.obtenerPreguntaActual()}.png`;
    document.body.classList.remove("user-restart-game");
    document.body.classList.remove("popup-active")
  }

  async jugarOtraVez() {
    document.body.classList.remove(this.estado);
    this.estado = "user-restart-game";
    document.body.classList.add(this.estado);
    this.juego.intentarDeNuevo();
    // se ejecutan dos animaciones y se actualiza la ui al finalizar
    //   await this.animacionResetearJuego();
    await this.actualizarPopup();
    this.resetearJuego();
  }

  userPierde() {
    // elimina estado anterior y actualiza
    document.body.classList.remove(this.estado);
    document.body.classList.add("user-loses");
    this.estado = "user-loses";
  }

  userGana() {
    // elimina estado anterior y actualiza
    document.body.classList.remove(this.estado);
    document.body.classList.add("user-wins");
    this.estado = "user-wins";
  }

  userRespondeBien() {
    // el setTimeOut asociado elimina el estado anterior
    this.puntos.innerHTML = `+ ${this.juego.incPuntaje()}`;
    this.barraProgreso.style.width = `${this.juego.getProgreso()}%`;
    this.estado = "user-reply-succeeded";    
    document.body.classList.add(this.estado);
    this.userRespondeBienTimeout();
  }

  userRespondeMal() {
    // el setTimeOut asociado elimina el estado anterior
    this.puntos.innerHTML = `- ${this.juego.decPuntaje()}`;
    this.estado = "user-reply-failed";
    document.body.classList.add(this.estado);
    this.userRespondeMalTimeout();
  }

  verificarRespuestaUsuario() {
    return this.juego.verificarRespuesta(this.respuestaActual);
  }

  userRespondeMalTimeout() {
    setTimeout(() => {
      document.body.classList.remove("user-reply-failed");
      document.body.classList.remove("popup-active")
    }, 1200);
  }

  userRespondeBienTimeout = () => {
    setTimeout(() => {
      document.body.classList.remove("user-reply-succeeded");
      document.body.classList.remove("popup-active")
    }, 1200);
  };

  avanzarJuego = () => {
    const shuffleImgs = this.shuffleImgs;
    this.cantidadApariciones.innerHTML = "0"; // cantAp
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
      },2000); /*importante shuffleImg es infinito por default*/
    } else {
      /* por default pasa a la sig pregunta */
      this.box.src = `src/img/objects/${this.juego.siguientePregunta()}.png`;
    }
    localStorage.setItem("score", JSON.stringify(this.juego.puntaje));
    return true;
  };

  manejarRespuestaUsuario = () => {
    this.respuestaActual = this.cantidadApariciones.innerHTML;
    document.body.classList.add("popup-active");
    if (this.verificarRespuestaUsuario()) {
      if (!this.juego.haTerminado()) {
        this.userRespondeBien(); //cambia el estado
        this.avanzarJuego();
      } else {
        this.finDelJuego(); // cambia el estado
      }
    } else {
      if (!this.juego.haTerminado()) {
        this.userRespondeMal(); //cambia el estado
        this.userRespondeMalTimeout();
      } else {
        this.finDelJuego(); // cambia el estado
      }
    }
    this.actualizarPopup(); // importante
  };

  finDelJuego() {
    if (this.juego.haPerdido()) {
      this.userPierde(); // cambia estado
    } else {
      this.userGana(); // cambia estado
    }
    localStorage.setItem("score", JSON.stringify(this.juego.puntaje));
  }
}

export { QuizApp };
