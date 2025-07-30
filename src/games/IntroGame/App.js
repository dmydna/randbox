import App from "../../App.js";
import EventManager from "../../managers/Events.js";
import memory from "../../managers/Memory.js";
import { src_obj } from "../../utils/default.js";

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
    this.resumen = false
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

  animarInicio() {
    // document.onload = document.body.classList.add("onload");
    if(document.body.classList.contains("onload")){
      this.box.addEventListener(
        "animationend",() => {document.body.classList.remove("onload");},
        { once: true }
      );
      // memory.set("partida_intro", {
      //   ...memory.get("partida_intro"),
      //   intro_base              : "init",
      // })
      this.recordar()
    }
  }


  recordar = () => {
    memory.set("partida_intro", {
      ...memory.get("partida_intro"),
      intro_base              : "init",
      intro_estado            : this.estado,
      intro_pregunta          : this.preguntas[this.index],
      intro_progreso          : this.progreso.style.width ,
      intro_index             : this.index,
      intro_intentos          : this.intentos,
      intro_intentosRestantes : this.intentosRestantes,
      intro_quiz              : this.quiz,
      intro_preguntas         : this.preguntas 
    });
  };

  reanudarPartida(partida) {
    if (partida.intro_base == "_") {
      // importante: caso base de  recursion
      return;
    }
    if (this.resumen) {

      this.quiz              = partida.intro_quiz;
      this.intentos          = partida.intro_intentos;
      this.intentosRestantes = partida.intro_intentosRestantes;
      this.preguntas         = partida.intro_preguntas
      this.estado            = partida.intro_estado;
      this.index             = partida.intro_index;

      document.body.classList.add('continue')
      if(partida.intro_progreso == ''){
        console.log(partida.intro_progreso)
        document.body.classList.remove('playGame')
      }else{
        document.body.classList.add('playGame')
      }

      this.progreso.style.width = `${partida.intro_progreso}`;
      this.pregunta.src = `${src_obj}${this.preguntas[this.index]}.png`
      memory.set("partida_quiz", {
        ...memory.get("partida_quiz"),
        quiz: this.quiz,
        preguntasDisponibles: this.preguntas,
      });
      // this.resumen = false
    }
  }


  endGame() {
    this.cambiarEstado({ endgame: true });
    this.box.addEventListener(
      "animationend",
      () => {
        memory.set("token", "quiz-loaded");
        App.setPreRender( ()=>{
          document.body.classList.add('onload')
        })
      
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

    memory.set("partida_quiz", {
      ...memory.get("partida_quiz"),
      quiz: this.quiz,
      preguntasDisponibles: this.preguntas,
    });
    
    this.recordar();

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
      document.body.classList.remove( 'continue')

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
