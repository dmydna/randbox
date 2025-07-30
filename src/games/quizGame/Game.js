/*  QuizManger: 
-Recibe preguntas y respuestas (un objeto quiz implicito). 
-Dada la respuesta del user notifica si la respuesta es correcta. 
-Avanza de forma circular.
-No tiene limitaciones de intentos */

class QuizManager {
  #datos;
  #preguntaActual;

  // preguntas es dic(String, Int)
  // preguntaActual es {str: String, index: Int}
  // cantPreguntas es Int
  // preguntasDisponibles es Array[Int]

  constructor(preguntas) {
    this.#datos = preguntas;
    this.preguntas = Object.keys(preguntas);
    this.cantPreguntas = this.preguntas.length;
    this.#preguntaActual = {
      str: `${this.preguntas[0]}`,
      index: 0,
    };
  }

  reiniciar(){
    // vuelve a la primer pregunta
    return this.cambiarPregunta(this.preguntas[0])
  }
  obtenerPregunta() {
    const res = this.#preguntaActual.str;
    return res;
  }

  cambiarPregunta(pregunta) {
    if (this.preguntas.includes(pregunta)) {
      for (let i = 0; i < this.preguntas.length; i++) {
        if (this.preguntas[i] == pregunta) {
          this.#preguntaActual.str = pregunta;
          this.#preguntaActual.index = i;
          return true;
        }
      }
    }
    return false;
  }


  siguientePregunta() {
    let preguntaActualIndex = this.#preguntaActual.index;
    let preguntaActualString = this.#preguntaActual.str;
    preguntaActualIndex++;
    preguntaActualIndex %= this.cantPreguntas;
    preguntaActualString = this.preguntas[preguntaActualIndex];

    this.#preguntaActual.str = preguntaActualString;
    this.#preguntaActual.index = preguntaActualIndex;

    return preguntaActualString;
  }

  verificarRespuesta(respuestaUsuario) {
    if (respuestaUsuario == this.#datos[this.#preguntaActual.str]) {
      return true;
    } else {
      return false;
    }
  }
}

/* Dado un QuizManager, JuegoQuiz limita los intentos, agrega un sistema de puntaje, 
agrega la capacidad de saltar preguntas del quiz
*/

class JuegoQuiz {
  // quiz es Quiz
  // intentosRestantes es Int
  // puntaje es Int
  // preguntasDisponibles es Array[String]
  // partida { Dict, Int }


  constructor(datos, intentos=3) {
    this.quiz = new QuizManager(datos);
    this.preguntaActual = this.quiz.obtenerPregunta()
    this.progreso = 0;
    this.puntaje  = 0;
    this.vidas  =  intentos 
    this.preguntas = this.quiz.preguntas
    this.preguntasDisponibles = this.preguntas;
    this.intentosRestantes = this.vidas; // Vida del user
  }

  obtenerPreguntaActual() {
    return this.preguntaActual;
  }

  intentarDeNuevo() {
    if(this.quiz.reiniciar()){
      // vuelve a la primer pregunta
      this.preguntasDisponibles = this.preguntas;
      this.intentosRestantes    = this.vidas;
      this.preguntaActual       = this.quiz.obtenerPregunta()
      this.puntaje  = 0;
      this.progreso = 0;
    } 

  }

  recordar = () => {
    return {
      puntaje:   this.puntaje,
      progreso:  this.progreso,
      preguntas: this.preguntas,
      preguntasDisponibles: this.preguntasDisponibles,
      intentosRestantes:    this.intentosRestantes,
    };
  };

  cambiarPreguntaActual(pregunta) {
    if (this.quiz.cambiarPregunta(pregunta)) {
      this.preguntaActual = pregunta;
    }
  }

  retomarPartida(partida) {
    this.puntaje = partida.puntaje;
    this.progreso = partida.progreso;
    this.preguntasDisponibles = partida.preguntasDisponibles;
    this.preguntas = partida.preguntas;
    this.intentosRestantes = partida.intentosRestantes;
    this.cambiarPreguntaActual(partida.pregunta);
  }

  verificarRespuesta(respuestaUsuario) {
    const esCorrecta = this.quiz.verificarRespuesta(respuestaUsuario);
    const preguntaActualString = this.preguntaActual;
    if (esCorrecta) {
      this.preguntasDisponibles = this.preguntasDisponibles.filter(
        (elem) => elem != preguntaActualString
      );
      this.incPuntaje();
    } else {
      if (!this.intentosRestantes <= 0) {
        this.intentosRestantes--;
      }
      this.decPuntaje();
    }
    return esCorrecta;
  }

  siguientePregunta() {
    // preguntasDisponibles indica si la siguiente pregunta del quiz
    // esta disponible, no obtiene la siguiente pregunta

    const preguntasDisponibles = this.preguntasDisponibles;
    let siguientePreguntaString = this.quiz.siguientePregunta();

    if (this.haTerminado()) {
      return null;
    }

    this.shufflePreguntas();

    // siguiente pregunta es alteatoria y sin restricciones,
    // busco una pregunta que si este disponible
    while (!preguntasDisponibles.includes(siguientePreguntaString)) {
      siguientePreguntaString = this.quiz.siguientePregunta();
    }
    this.preguntaActual = siguientePreguntaString;

    return siguientePreguntaString;
  }

  shufflePreguntas() {
    // Esto altera el orden de las preguntas y en especial de la siguiente
    const longitud = this.quiz.cantPreguntas;
    for (let i = longitud - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.quiz.preguntas[i], this.quiz.preguntas[j]] = [
        this.quiz.preguntas[j],
        this.quiz.preguntas[i],
      ];
    }
  }

  haTerminado() {
    return this.haPerdido() || this.haGanado();
  }

  haPerdido() {
    return this.intentosRestantes == 0;
  }
  haGanado() {
    return this.preguntasDisponibles.length == 0;
  }

  incPuntaje() {
    let puntos = 3000;
    this.puntaje += puntos;
    return puntos;
  }

  decPuntaje() {
    let puntos = 2500;
    this.puntaje += puntos;
    return puntos;
  }

  getProgreso() {
    this.progreso =
      ((this.quiz.cantPreguntas - this.preguntasDisponibles.length) /
        this.quiz.cantPreguntas) *
      100;
    return this.progreso;
  }
}

export default JuegoQuiz;
