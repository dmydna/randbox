import App from "../../main.js";
import EventManager from "../../managers/Events.js";
import memory from "../../managers/Memory.js";

class introGameApp extends EventManager {
  constructor(quizVacio, intentos, container) {
    super();
    this.quiz = quizVacio;
    this.intentos = intentos;
    this.intentosRestantes = intentos;
    this.preguntas = Object.keys(quizVacio);
    this.estado = null;
    this.container = container;
    this.progreso = null;
    this.teclado = false;
    this.box = this.container.querySelector(".box");
    this.pregunta = this.container.querySelector(".gift");
    this.index = 0;
  }

  jugar() {
    if (this.teclado) {
      this._addEvent(document, "keydown", (e) => {
        this.keyboardHander(e);
      });
    }
    this._addEvent(this.box, "animationstart", this.boxAnimationStart);
    this._addEvent(this.box, "animationend", this.boxAnimationEnd);
    this._addEvent(this.box, "click", this.manejarRespuestaUsuario);
  }

  endGame() {
    this.cambiarEstado({ endgame: true });
    this.box.addEventListener(
      "animationend",
      () => {
        memory.set("token", "quiz-loaded");
        App.router("/quiz");
      },
      { once: true }
    );
  }

  cambiarEstado(States) {
    Object.entries(States).forEach(([State, bool]) => {
      if (bool) {
        this.estado = State;
        document.body.classList.add(State);
      } else {
        document.body.classList.remove(State);
      }
    });
  }

  keyboardHander(e) {
    if (e.key == " ") {
      if(this.estado == 'box-down'){
         this.box.click();
      }
    }
  }

  kill() {
    this._removeAllEvents();
  }

  boxAnimationStart = () => {
    this.cambiarEstado({
      "box-up": true,
      "box-down": false,
      "box-anim": true,
    });
  };

  boxAnimationEnd = () => {
    this.cambiarEstado({
      "box-up": false,
      "box-down": true,
      "box-anim": false,
    });
    if (this.intentosRestantes == 0) {
      this.endGame();
    }
  };

  actualizarData() {
    // Actualiza cantidad de apariciones
    const pregunta = this.preguntas[this.index];
    this.quiz[pregunta] = this.quiz[pregunta] ?? 0;
    this.quiz[pregunta]++;

    memory.set("partida", {
      ...memory.get("partida"),
      quiz: this.quiz,
      preguntasDisponibles: this.preguntas,
    });
  }

  manejarRespuestaUsuario = () => {
    if (this.intentosRestantes == 0) {
      this._removeAllEvents();
      return;
    }
    this.cambiarEstado({ playGame: true });
    this.avanzarJuego();
    this.actualizarData();
  };

  obtenerProgreso() {
    let progreso =
      ((this.intentos - this.intentosRestantes + 1) / this.intentos) * 100;
    if (this.intentosRestantes == 0) {
      progreso = "100%";
    }
    return progreso;
  }

  avanzarJuego = () => {
    if (!this.container.querySelector(".box-up")) {
      this.index = Math.floor(Math.random() * this.preguntas.length);
      this.cambiarEstado({ "box-anim": true, "box-down": false });
      this.pregunta.src = `src/assets/img/objects/${
        this.preguntas[this.index]
      }.png`;
      this.progreso.style.width = `${this.obtenerProgreso()}%`;
      this.intentosRestantes--;
    }
  };
}

export default introGameApp;
