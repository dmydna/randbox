// Props de gameQuizUI
import {src_pop} from '../../main.js';


class Popup{

	constructor(elem){
	  this.elem = elem
	  this.contexto = null;
	  this.estado = 'hidden'
	}
  
	_init =  (contexto) => {
		this.contexto  = contexto
		this.img =   this.elem.querySelector(".popup-ico")
		this.btn =   this.elem.querySelector(".popup-btn")
		this.crearCorazones()
	}
	async actualizar() {
		switch (this.contexto.estado) {
		  case "user-wins":
			this.img.src = src_pop + "win.png";
			this.btn.firstElementChild.classList.add("fi-rr-play-circle");
			break;
		  case "user-loses":
			this.img.src = src_pop + "game-over.png";
			this.btn.firstElementChild.classList.add("fi-rr-rotate-left");
			break;
		  case "user-reply-succeeded":
			this.img.src = src_pop + "like.png";
			break;
		  case "user-reply-failed":
			this.img.src = src_pop + "skull.png";
			this.quitarCorazones()
			break;
		  case "user-restart-game":
			this.btn.classList.remove("fi-rr-rotate-left","tryAgainBtn");
			this.img.src = src_pop + "again.png";
		}
	  }
	
  
	async recargarVidaPromise(resolve){
		let i = 0;
		let intervalo = setInterval(() => {
		  i = i % this.corazones.length;
		  if (this.corazones[i]) {
			this.corazones[i].classList.remove("fi-rr-heart");
			this.corazones[i].classList.add("fi-ss-heart");
			i++;
		  }
		  if (i == this.corazones.length) {
			setTimeout(()=>{
			  clearInterval(intervalo);
			  resolve(true); 
			},300)
		  }
		}, 500);
	}
	
	recargarVida() {
		return new Promise(resolve => {
		this.recargarVidaPromise(resolve)
		});
	}

	crearCorazones() {
		this.corazones = this.elem.querySelector(".heart-bar");
		for (let i = 0; i < this.contexto.juego.intentosRestantes; i++) {
		  let heart = document.createElement("i");
		  heart.classList.add("fi", "fi-ss-heart");
		  this.corazones.appendChild(heart);
		}
		this.corazones = this.corazones.children
	  }
	
	quitarCorazones(){
	  let index = this.contexto.juego.intentosRestantes

		while(!this.corazones[index]){
			index--
			if(index < 0){
				return
			}
		}

	  setTimeout( ()=>{ 
	  	this.corazones[index].classList.remove("fi-ss-heart");
	   } ,800)
	  this.corazones[index].classList.add("fi-rr-heart") 
	}

	async reiniciar() {
		// inicia shuffle infinito
		this.contexto._animations.shuffleAnimate(null, 'infinite');
		await this.recargarVida()	
	   // detiene shuffle infinito
		this.contexto._animations.detenerAnimacion()
		// para devolver una promesa envuela
		return true 
	}
	

	show(bool=true){
		if(!bool){
			this.estado = 'hidden'
			document.body.classList.remove("popup-active")
			return
		}  
		this.estado = 'visible'
		document.body.classList.add("popup-active")
        return
	}

  }
  







export default Popup;
