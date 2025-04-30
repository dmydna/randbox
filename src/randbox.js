/*  Quiz es un tad que recibe preguntas y respuestas. 
Dada la respuesta del user notifica si la respuesta es correcta. 
Quiz es circular y no tiene ninguna limitacion en intentos  */

class Quiz {

	#datos;
	#preguntaActual;

	// preguntas es dic(String, Int)
	// preguntaActual es {str: String, index: Int}
	// cantPreguntas es Int
	// preguntasDisponibles es Array[Int]

	constructor(preguntas){;
		this.#datos = preguntas;
		this.preguntas = Object.keys(preguntas);
		this.#preguntaActual = {str:`${this.preguntas[0]}`,index: 0};
		this.cantPreguntas = this.preguntas.length;
	}
	
	getPreguntaActual(){
		const res = this.#preguntaActual.str 
		return res;
	}

	getIndex(){
		return this.#preguntaActual.index;
	}

	siguientePregunta(){
		let preguntaActualIndex  = this.#preguntaActual.index
		let preguntaActualString = this.#preguntaActual.str
		preguntaActualIndex ++
		preguntaActualIndex %= this.cantPreguntas;
		preguntaActualString = this.preguntas[preguntaActualIndex]

		this.#preguntaActual.str = preguntaActualString;
		this.#preguntaActual.index = preguntaActualIndex;

		return preguntaActualString;
	}

	verificarRespuesta(respuestaUsuario){

		if(respuestaUsuario == this.#datos[this.#preguntaActual.str] ){
			console.log("Responde Bien");
			return true
		}else{
			console.log("Responde Mal")
			return false
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

    constructor(preguntas, intentosIniciales = 3) {
        this.quiz = new Quiz(preguntas);
        this.intentosRestantes = intentosIniciales; // Vida del user
        this.puntaje = 0;
		this.preguntasDisponibles = Object.keys(preguntas);
    }

    obtenerPreguntaActual() {
        return this.quiz.getPreguntaActual();
    }

    verificarRespuesta(respuestaUsuario) {
        const esCorrecta = this.quiz.verificarRespuesta(respuestaUsuario);
		const preguntaActualString = this.quiz.getPreguntaActual()
        if (esCorrecta) {
			this.preguntasDisponibles = this.preguntasDisponibles.filter(elem => elem != preguntaActualString)
			this.puntaje ++;
            console.log("¡Correcto!");
        } else {
            this.intentosRestantes--;
        }
        return esCorrecta;
    }

    siguientePregunta() {

		const preguntasDisponibles     = this.preguntasDisponibles
		let   siguientePreguntaString  = this.quiz.siguientePregunta()

		if(this.haTerminado()){ return null }
		
		while( ! preguntasDisponibles.includes(siguientePreguntaString) ) {
			siguientePreguntaString = this.quiz.siguientePregunta()
		}

        return siguientePreguntaString;
    }

    haTerminado() {
        return  this.haPerdido() || this.preguntasDisponibles == 0;
    }

	haPerdido(){
		return this.intentosRestantes == 0;
	}

}


export { JuegoQuiz };

