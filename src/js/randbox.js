import { JuegoQuiz, ShuffleImgsAnim } from "./class.js";

// Maneja la interfaz del juego
// JuegoQuizUI -> JuegoQuiz -> Quiz

class JuegoQuizUI {
  constructor(preguntas, cantVidas) {
    this.estado = null;
    this.juego = new JuegoQuiz(preguntas, cantVidas);
    this.respuestaActual = 0;
    this.nuevojuego(preguntas);
  }

  nuevojuego(preguntas) {
    this.box = document.querySelector(".box");
    this.shuffleImgs = new ShuffleImgsAnim(Object.keys(preguntas), this.box);
    this.puntos = document.querySelector(".puntos");
    this.popup = document.querySelector(".popup");
    this.popupImg = document.querySelector(".popup-ico");
    this.popupBtn = document.querySelector(".popup-btn");
    this.barraCorrazones = document.querySelector(".heart-bar");
    this.barraProgreso = document.querySelector(".progress-bar");
    this.corrazones = document.querySelectorAll(".heart-bar .fi");
    this.cantidadApariciones = document.querySelector(".cantAp");
    this.corazones = this.crearCorazones();
  }

  iniciarJuego() {
    const checkBtn = document.querySelector(".midBtn");
    const resetBtn = document.querySelector(".ltBtn")
    const plusBtn = document.querySelector(".rtBtn")
    const cantAp = document.querySelector(".cantAp")

    // incializa la primer pregunta
    this.box.src = `src/img/objetos/${this.juego.obtenerPreguntaActual()}.png`;

    /* navFooter eventos  */
    checkBtn.addEventListener("click", this.manejarRespuestaUsuario);
    resetBtn.addEventListener('click', (e) => {  cantAp.innerHTML="0";})
    plusBtn.addEventListener('click', (e) => { e.stopPropagation(); cantAp.innerHTML ++;});

    /* randbox eventos */
    cantAp.addEventListener('click', (e)=>{ cantAp.innerHTML ++; });
    this.box.addEventListener("click", this.avanzarJuego);

    /* popup eventos */
    this.popupBtn.addEventListener("click", () => {
      if (this.estado == "userPierde") {
        /* Reiniciar juego */
        this.jugarOtraVez();
      } 
      if( this.estado == "userGana"){
        /* ver score */
        document.body.classList.add("slide-out-left");
        document.body.addEventListener("animationend", () => {
          window.location.href = "../score.html";
        });
      }
    });
  }

  // eliminarEventos() {
  //   this.checkBtn.removeEventListener('click' , this.manejarRespuestaUsuario )
  //   this.box.removeEventListener('click', this.avanzarJuego );
  // }

  jugarOtraVez() {
    document.body.classList.remove(this.estado);
    this.estado = "userReiniciaPartida";
    document.body.classList.add(this.estado);
    this.juego.intentarDeNuevo();
    this.actualizarPopup();
    // se ejecutan dos animaciones y se actualiza la ui al finalizar
    this.animacionResetearJuego(this.heartUpAnim());
  }

  actualizarPopup() {
    let estado = this.estado;
    switch (estado) {
      case "userGana":
        this.popupImg.src = "src/img/ui/win.png";
        this.popupBtn.classList.add("fi", "fi-rr-play-circle", "verScoreBtn");
        break;
      case "userPierde":
        this.popupImg.src = "src/img/ui/game-over.png";
        this.popupBtn.classList.add("fi","fi-rr-rotate-left","tryAgainBtn");
        break;
      case "userRespondeBien":
        this.popupImg.src = "src/img/ui/like.png";
        break;
      case "userRespondeMal":
        this.popupImg.src = "src/img/ui/skull.png";
        break;
      case "userReiniciaPartida":
        this.popupBtn.classList.remove("fi","fi-rr-rotate-left","tryAgainBtn");
        this.popupImg.src = "src/img/ui/again.png";
        break;
    }
  }

  userPierde() {
    // elimina estado anterior y actualiza
    document.body.classList.remove(this.estado);
    document.body.classList.add("userPierde");
    this.estado = "userPierde";
  }

  userGana() {
    // elimina estado anterior y actualiza
    document.body.classList.remove(this.estado);
    document.body.classList.add("userGana");
    this.estado = "userGana";
  }

  userRespondeBien() {
    // el setTimeOut asociado elimina el estado anterior
    this.puntos.innerHTML = `+ ${this.juego.incPuntaje()}`;
    this.barraProgreso.style.width = `${this.juego.getProgreso()}%`;
    this.estado = "userRespondeBien";
    document.body.classList.add(this.estado);

    this.userRespondeBienTimeout();
  }

  userRespondeMal() {
    // el setTimeOut asociado elimina el estado anterior
	      const index = this.juego.intentosRestantes 
    setTimeout( ()=>{ this.corazones[index].classList.remove("fi-ss-heart"); } ,800)

    this.corazones[index].classList.add("fi-rr-heart") 
    this.puntos.innerHTML = `- ${this.juego.decPuntaje()}`;
    this.estado = "userRespondeMal";
    document.body.classList.add(this.estado);

    this.userRespondeMalTimeout();
  }

  crearCorazones() {
    for (let i = 0; i < this.juego.intentosRestantes; i++) {
      let heart = document.createElement("i");
      heart.classList.add("fi", "fi-ss-heart");
      this.barraCorrazones.appendChild(heart);
    }
    return this.barraCorrazones.children;
  }

  heartUpAnim() {
    let i = 0;
    i = i % this.corazones.length
    let anim = setInterval(() => {
      this.corazones[i].classList.remove("fi-rr-heart");
      this.corazones[i].classList.add("fi-ss-heart");
      i++;
    }, 500);
    return anim;
  }

  animacionResetearJuego(intervalo) {
    // ejecuta callback despues del shuffle

    this.shuffleImgs.shuffleAnimate(() => {
      clearInterval(intervalo);
      this.barraProgreso.style.width = `${this.juego.getProgreso()}%`;
      this.cantidadApariciones.innerHTML = "0";
      document.body.classList.remove("userReiniciaPartida");
      return this.juego.obtenerPreguntaActual(); //importante
    });
  }

  verificarRespuestaUsuario() {
    return this.juego.verificarRespuesta(this.respuestaActual);
  }

  userRespondeMalTimeout() {
    setTimeout(() => {
      document.body.classList.remove("userRespondeMal");
    }, 1200);
  }

  userRespondeBienTimeout = () => {
    setTimeout(() => {
      document.body.classList.remove("userRespondeBien");
    }, 1200);
  };

  avanzarJuego = () => {
    const shuffleImgs = this.shuffleImgs;
    this.cantidadApariciones.innerHTML = "0"; // cantAp
    if (this.juego.haTerminado()) {
      /* Si el juego termina no cambia de pregunta */
      return false;
    }
    /* Pasa a la sig pregunta con una animacion shuffle*/
    if (shuffleImgs) {
      console.log("aca");
      document.body.style.pointerEvents = "none";
      // incia la animacion y ejecuta una funcion handler al finalizar
      shuffleImgs.shuffleAnimate((img, index) => {
        document.body.style.pointerEvents = "auto";
        return this.juego.siguientePregunta(); //importante
      });
    } else {
      /* por default pasa a la sig pregunta */
      this.box.src = `src/img/objetos/${this.juego.siguientePregunta()}.png`;
    }
    localStorage.setItem("score", JSON.stringify(this.juego.puntaje));
    return true;
  };


  manejarRespuestaUsuario = () => {
    this.respuestaActual = this.cantidadApariciones.innerHTML;

    if (this.verificarRespuestaUsuario()) {
      if (!this.juego.haTerminado()) {
        this.userRespondeBien(); //cambia el estado
        this.avanzarJuego();
      } else {
        this.finDelJuego(); // cambia el estado
      }
    } else {
      if (!this.juego.haTerminado()) {
        this.userRespondeMal(); //cambia el estado
        this.userRespondeMalTimeout();
      } else {
        this.finDelJuego(); // cambia el estado
      }
    }
    this.actualizarPopup(); // importante
  };


  finDelJuego() {
    if (this.juego.haPerdido()) {
      this.userPierde(); // cambia estado
    } else {
      this.userGana(); // cambia estado
    }
    localStorage.setItem("score", JSON.stringify(this.juego.puntaje));
  }



}
  

export { JuegoQuizUI };

