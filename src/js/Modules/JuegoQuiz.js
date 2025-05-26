import { Quiz } from "./Quiz.js";

/* Dado un quiz, JuegoQuiz limita los intentos, agrega un sistema de puntaje, 
agrega la capacidad de saltar preguntas del quiz
*/

class JuegoQuiz {

	// quiz es Quiz
	// intentosRestantes es Int
	// puntaje es Int
	// preguntasDisponibles es Array[String]
	// data { Dict, Int }

	#data

    constructor(preguntas, intentosIniciales = 3) {
        this.quiz = new Quiz(preguntas);
        this.intentosRestantes = intentosIniciales; // Vida del user
        this.puntaje = 0;
		this.preguntasDisponibles = Object.keys(preguntas);
		this.progreso = 0;
		this.#data = { "preguntas": preguntas, "intentos": intentosIniciales} // guarda los datos inciales
    }

    obtenerPreguntaActual() {
        return this.quiz.getPreguntaActual();
    }

	intentarDeNuevo(){

		let preguntas = this.#data["preguntas"]
		let intentos = this.#data["intentos"]

		this.quiz = new Quiz(preguntas)
		this.puntaje = 0;
		this.progreso = 0;
		this.preguntasDisponibles = Object.keys(preguntas)
		this.intentosRestantes = intentos
		this.preguntas = preguntas
	}

    verificarRespuesta(respuestaUsuario) {
        const esCorrecta = this.quiz.verificarRespuesta(respuestaUsuario);
		const preguntaActualString = this.quiz.getPreguntaActual()
        if (esCorrecta) {
			this.preguntasDisponibles = this.preguntasDisponibles.filter(elem => elem != preguntaActualString)
			this.incPuntaje()
            console.log("¡Correcto!");
        } else {
            if(!this.intentosRestantes <= 0){
                this.intentosRestantes--;
            }
			this.decPuntaje()
        }
        return esCorrecta;
    }

    siguientePregunta() {

		const preguntasDisponibles     = this.preguntasDisponibles
		let   siguientePreguntaString  = this.quiz.siguientePregunta()

		if(this.haTerminado()){ return null }
		
		this.shufflePreguntas()

		while( ! preguntasDisponibles.includes(siguientePreguntaString) ) {
			siguientePreguntaString = this.quiz.siguientePregunta()
		}

        return siguientePreguntaString;
    }

	shufflePreguntas(){

		const longitud = this.quiz.cantPreguntas;
		for (let i = longitud - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.quiz.preguntas[i], this.quiz.preguntas[j]] = [this.quiz.preguntas[j], this.quiz.preguntas[i]];
		}

	}

    haTerminado() {
        return  this.haPerdido() || this.haGanado();
    }

	haPerdido(){
		return this.intentosRestantes == 0;
	}
	haGanado(){
		return this.preguntasDisponibles.length == 0
	}

	incPuntaje(){
		let puntos = 3000
		this.puntaje += puntos 
		return puntos;
	}

	decPuntaje(){
		let puntos = 2500
		this.puntaje += puntos
		return puntos;
	}

	getProgreso(){
		this.progreso = (((this.quiz.cantPreguntas - this.preguntasDisponibles.length )
		 / this.quiz.cantPreguntas) * 100)
		return this.progreso;
	}

}


export {JuegoQuiz}