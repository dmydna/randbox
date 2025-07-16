import { src_obj, src_pop, src_ui } from "../../main.js";

/* hace un shuffle imgs con una animacion*/

class ShuffleImgsAnim {

	constructor() {
	  this.imagen = null; // pasar por parametro
	  this.srcInicial =  null // pasar por parametro
	  this.srcFinal = null;
	  this.datos = null; // pasar por parametro
	  this.tiempoDeCambio = 100; // ms entre cada cambio de imagen
	  this.duracionTotal; // ms de duración total del efecto
	  this.intervalo;
	  this.timeout;
	  this.indiceActual = 0;
	}
  
	_init(arrayImagenes, elem){
		this.imagen = elem
		this.srcInicial = elem.src
		this.datos = arrayImagenes
	}
	
	animarCambioImagen = () => {

	  if (this.imagen) {
		this.imagen.src = src_obj + this.datos[this.indiceActual] + ".png";
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

			if(!imagenFinal){ 
				console.log("shuffleImgAnim -> callback void function!")
				return
			 }  


			this.imagen.src = src_obj + imagenFinal + ".png"
			return

		   }
		   if(typeof(this.srcFinal) == 'string'){
			 let imagenFinal = this.srcFinal
		     this.imagen.src = src_obj + imagenFinal + ".png";
			 if(imagenFinal){ return } 
			 	console.log("shuffleImgAnim -> string Img is NULL!")
		   }

		   	// por defecto el srcFinal vuelve a su estado inicial
			this.imagen.src = this.srcInicial;
	  }
	}
  
	iniciarAnimacion = () => {
	  this.srcInicial = this.imagen.src;
	  this.indiceActual = 0; 
	  this.intervalo = setInterval(this.animarCambioImagen, this.tiempoDeCambio);
	 
	 if(this.duracionTotal != 'infinite'){
		this.timeout = setTimeout(this.finalizarAnimacionAleatoria, this.duracionTotal);
	 }
	}
  
	detenerAnimacion = () => {
	  if (this.intervalo) {
		clearInterval(this.intervalo);
		this.intervalo = null;
	  }
	  if (this.timeout) {
		clearTimeout(this.timeout);
		this.timeout = null;
	  }
	}

	shuffleAnimate = (funcion, time='infinite') =>{
		this.srcFinal = funcion
		this.duracionTotal=time
		this.iniciarAnimacion()
		console.log("shuffleTime -> " + time)
	} 
}


export default ShuffleImgsAnim;