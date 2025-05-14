/*  Quiz es un tad que recibe preguntas y respuestas. 
Dada la respuesta del user notifica si la respuesta es correcta. 
Quiz es circular y no tiene ninguna limitacion en intentos  */

class Quiz {

  private datos: { [key: string]: number };
  private preguntaActual: { str: string; index: number };
  public  preguntas: string[];
  public  cantPreguntas: number;

  constructor(preguntas: { [key: string]: number }) {
    this.datos = preguntas;
    this.preguntas = Object.keys(preguntas);
    this.preguntaActual = { str: `${this.preguntas[0]}`, index: 0 };
    this.cantPreguntas = this.preguntas.length;
  }

  getPreguntaActual(): string {
    return this.preguntaActual.str;
  }

  getIndex(): number {
    return this.preguntaActual.index;
  }

  siguientePregunta(): string {
    let preguntaActualIndex: number = this.preguntaActual.index;
    let preguntaActualString: string = this.preguntaActual.str;
    preguntaActualIndex++;
    preguntaActualIndex %= this.cantPreguntas;
    preguntaActualString = this.preguntas[preguntaActualIndex];

    this.preguntaActual.str = preguntaActualString;
    this.preguntaActual.index = preguntaActualIndex;

    return preguntaActualString;
  }

  verificarRespuesta(respuestaUsuario: string | number): boolean {
    if (respuestaUsuario == this.datos[this.preguntaActual.str]) {
      console.log("Responde Bien");
      return true;
    } else {
      console.log("Responde Mal");
      return false;
    }
  }
}

/* Dado un quiz, JuegoQuiz limita los intentos, agrega un sistema de puntaje, 
agrega la capacidad de saltar preguntas del quiz
*/

class JuegoQuiz {
  // quiz es Quiz
  // intentosRestantes es Int
  // puntaje es Int
  // preguntasDisponibles es Array[String]
  public quiz: Quiz;
  public intentosRestantes: number;
  public puntaje: number;
  public preguntasDisponibles: string[];
  public progreso: number;

  constructor(preguntas: { [key: string]: number }, intentosIniciales: number = 3 ) {
    this.quiz = new Quiz(preguntas);
    this.intentosRestantes = intentosIniciales; // Vida del user
    this.puntaje = 0;
    this.preguntasDisponibles = Object.keys(preguntas);
    this.progreso = 0;
  }

  obtenerPreguntaActual() {
    return this.quiz.getPreguntaActual();
  }

  verificarRespuesta(respuestaUsuario: number): boolean{
    const esCorrecta: boolean = this.quiz.verificarRespuesta(respuestaUsuario);
    const preguntaActualString: string = this.quiz.getPreguntaActual();
    if (esCorrecta) {
      this.preguntasDisponibles = this.preguntasDisponibles.filter(
        (elem: string) => elem != preguntaActualString
      );
      this.incPuntaje();
      console.log("¡Correcto!");
    } else {
      this.intentosRestantes--;
      this.decPuntaje();
    }
    return esCorrecta;
  }

  siguientePregunta(): string | null {
    const preguntasDisponibles: string[] = this.preguntasDisponibles;
    let siguientePreguntaString: string = this.quiz.siguientePregunta();

    if (this.haTerminado()) {
      return null;
    }

    this.shufflePreguntas();

    while (!preguntasDisponibles.includes(siguientePreguntaString)) {
      siguientePreguntaString = this.quiz.siguientePregunta();
    }

    return siguientePreguntaString;
  }

  shufflePreguntas(): void {
    const largo: number = this.quiz.cantPreguntas;

    for (let i: number = largo - 1; i > 0; i--) {
      // Genera un índice aleatorio entre 0 y el índice actual (inclusive)
      const j: number = Math.floor(Math.random() * (i + 1));
      // Intercambia el elemento actual (en el índice i) con el elemento aleatorio (en el índice j)
      [this.quiz.preguntas[i], this.quiz.preguntas[j]] = [
        this.quiz.preguntas[j],
        this.quiz.preguntas[i],
      ];
    }
  }

  haTerminado(): boolean {
    return this.haPerdido() || this.preguntasDisponibles.length == 0;
  }

  haPerdido(): boolean {
    return this.intentosRestantes == 0;
  }

  incPuntaje(): number {
    let puntos: number = 3000;
    this.puntaje += puntos;
    return puntos;
  }

  decPuntaje(): number {
    let puntos: number = 2500;
    this.puntaje += puntos;
    return puntos;
  }

  getProgreso(): number {
    this.progreso =
      ((this.quiz.cantPreguntas - this.preguntasDisponibles.length) /
        this.quiz.cantPreguntas) *
      100;
    return this.progreso;
  }
}

/* hace un random imgs con una animacion*/

class ShuffleImgsAnim {

  public imagen: HTMLImageElement
  public srcInicial: string | null
  public imgs: string[]
  public tiempoDeCambio: number
  public manejadorFinal: (texto: string, numero: number) => string 
  public duracionTotal: number
  public intervalo: number | null
  public indiceActual: number
  public timeoutFinal: Function | null;

  constructor(imagenesArray: string[],
        elem: HTMLImageElement, 
        manejadorFinal: ((texto: string, numero: number) => string) ) {
    this.imagen = elem;
    this.srcInicial = null;
    this.imgs = imagenesArray;
    this.tiempoDeCambio = 100; // Milisegundos entre cada cambio de imagen
    this.manejadorFinal = manejadorFinal;
    this.duracionTotal = 2000; // Milisegundos de duración total del efecto
    this.indiceActual = 0;
    this.intervalo = null; // Inicializamos a null
    this.timeoutFinal = null; // Inicializamos a null
  }

  animarCambioImagen = () => {
    /* al finalizar la funcion la imagen es img[0]*/
    if (this.imagen) {
      this.imagen.src =
        "src/img/objetos/" + this.imgs[this.indiceActual] + ".png";
      this.indiceActual = (this.indiceActual + 1) % this.imgs.length;
    }
  };

  finalizarAnimacionAleatoria = () => {
    this.detenerAnimacionSecuencial();

    /* Controla el estado final de la imagen */
    if (this.imagen && this.imgs.length > 0) {
      // por defecto vuelve al estado inicial la imagen
      this.imagen.src = this.srcInicial;

      const index = this.indiceActual;

      if (typeof this.manejadorFinal == "function") {
        this.imagen.src =
          "src/img/objetos/" +
          this.manejadorFinal(this.imgs[index], index) +
          ".png";
      }
      if (typeof this.manejadorFinal == "string") {
        this.imagen.src = "src/img/objetos/" + this.manejadorFinal + ".png";
      }
    }
  };

  iniciarAnimacionSecuencial = () => {
    this.srcInicial = this.imagen.src;
    this.indiceActual = 0;
    this.intervalo = setInterval(this.animarCambioImagen, this.tiempoDeCambio);
    this.timeoutFinal = setTimeout(
      this.finalizarAnimacionAleatoria,
      this.duracionTotal
    );
  };

  detenerAnimacionSecuencial = () => {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
    if (this.timeoutFinal) {
      clearTimeout(this.timeoutFinal);
      this.timeoutFinal = null;
    }
  };

  shuffle = () => {
    this.iniciarAnimacionSecuencial();
  };
}

export { JuegoQuiz, ShuffleImgsAnim };
