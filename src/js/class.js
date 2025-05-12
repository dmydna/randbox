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



/* hace un shuffle imgs con una animacion*/

class ShuffleImgsAnim {

	constructor(imagenesArray, img_elem) {
	  this.imagen = img_elem;
	  this.srcInicial =  img_elem.src;
	  this.srcFinal = null;
	  this.datos = imagenesArray;
	  this.tiempoDeCambio = 100; // ms entre cada cambio de imagen
	  this.duracionTotal = 2000; // ms de duración total del efecto
	  this.intervalo = null;
	  this.timeout = null;
	  this.indiceActual = 0;


	}
  
	animarCambioImagen = () => {

	  if (this.imagen) {
		this.imagen.src = "src/img/objetos/" + this.datos[this.indiceActual] + ".png";
		this.indiceActual = (this.indiceActual + 1) % this.datos.length;

		}
	}
  
	finalizarAnimacionAleatoria = () => {

	  this.detenerAnimacion()
	  
	  /* Controla el srcFinal final de la imagen */
	  if (this.imagen && this.datos.length > 0) {

		   const index = this.indiceActual; 

		   if(typeof(this.srcFinal) == 'function'){
			// ejecuta la funcion que tiene que devolver una imagen
			let imagenFinal = this.srcFinal(this.datos[index], index)
			this.imagen.src = "src/img/objetos/" + imagenFinal + ".png";
			if(imagenFinal){ return }  
				console.log("shuffleImgAnim -> callback void function!")
		   }
		   if(typeof(this.srcFinal) == 'string'){
			 let imagenFinal = this.srcFinal
		     this.imagen.src = "src/img/objetos/" + imagenFinal + ".png";
			 if(imagenFinal){ return } 
			 	console.log("shuffleImgAnim -> string Img NULL!")
		   }

		   	// por defecto el srcFinal vuelve a su estado inicial
			this.imagen.src = this.srcInicial;
	  }
	}
  
	iniciarAnimacion = () => {
	  this.srcInicial = this.imagen.src;
	  this.indiceActual = 0; 
	  this.intervalo = setInterval(this.animarCambioImagen, this.tiempoDeCambio);
	  this.timeout = setTimeout(this.finalizarAnimacionAleatoria, this.duracionTotal);
	}
  
	detenerAnimacion = () => {
		console.log("detenerAnimacion")
	  if (this.intervalo) {
		clearInterval(this.intervalo);
		this.intervalo = null;
	  }
	  if (this.timeout) {
		clearTimeout(this.timeout);
		this.timeout = null;
	  }
	}

	shuffleAnimate = (funcion) =>{
		this.srcFinal = funcion
		this.iniciarAnimacion()
	} 
}


export {JuegoQuiz,Quiz,ShuffleImgsAnim}