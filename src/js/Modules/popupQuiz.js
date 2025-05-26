// Props de JuegoQuizUI

async function recargarVida(resolve){
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


function recargarVidaAnimacion() {
	return new Promise(resolve => {
	this.recargarVida(resolve)
	});
}


function crearCorazones() {
  for (let i = 0; i < this.juego.intentosRestantes; i++) {
	let heart = document.createElement("i");
	heart.classList.add("fi", "fi-ss-heart");
	this.barraCorrazones.appendChild(heart);
  }
  return this.barraCorrazones.children;
}


function quitarCorazones(){
	let index = this.juego.intentosRestantes  
	setTimeout( ()=>{ this.corazones[index].classList.remove("fi-ss-heart"); } ,800)
	this.corazones[index].classList.add("fi-rr-heart") 
}


async function actualizarPopup() {
	let estado = this.estado;
	switch (estado) {
	  case "user-wins":
		this.popupImg.src = "src/img/popup/win.png";
		this.popupBtn.firstElementChild.classList.add("fi-rr-play-circle");
		break;
	  case "user-loses":
		this.popupImg.src = "src/img/popup/game-over.png";
		this.popupBtn.firstElementChild.classList.add("fi-rr-rotate-left");
		break;
	  case "user-reply-succeeded":
		this.popupImg.src = "src/img/popup/like.png";
		break;
	  case "user-reply-failed":
		this.popupImg.src = "src/img/popup/skull.png";
		this.quitarCorazones()
		break;
	  case "user-restart-game":
		this.popupBtn.classList.remove("fi-rr-rotate-left","tryAgainBtn");
		this.popupImg.src = "src/img/popup/again.png";
		return this.resetearJuegoAnimacion()
	}
  }



async function resetearJuegoAnimacion() {
	// inicia shuffle infinito
	this.shuffleImgs.shuffleAnimate(null, 'infinite');
	await this.recargarVidaAnimacion()	
   // detiene shuffle infinito
	this.shuffleImgs.detenerAnimacion()
	// para devolver una promesa envuela
	return true 
}





export {crearCorazones,quitarCorazones, recargarVidaAnimacion ,actualizarPopup, resetearJuegoAnimacion, recargarVida}