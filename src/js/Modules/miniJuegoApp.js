class MiniJuegoApp {

  constructor(imgArray, intentos) {
    this.data = {};
    this.intentos = intentos
    this.intentosRestantes = intentos;
    this.preguntas = imgArray;
    this.estado = "";
    this.nuevoJuego();
  }

  nuevoJuego() {
    this.box = document.querySelector(".box");
    this.barra = document.querySelector(".progress-bar");
    this.gift = document.querySelector(".gift");
    this.index = 0;
    
    this.preguntas.forEach(src => {
      this.data[src] = 0     
    });

  }

  jugar() {
    console.log('jugar minijuego!')
    this.box.addEventListener("animationstart", this.boxAnimationStart);
    this.box.addEventListener("animationend", this.boxAnimationEnd);
    this.box.addEventListener("click", this.manejarRespuestaUsuario);
  }

  endGame() {
    document.body.classList.add("endgame");
    this.box.addEventListener('animationend', ()=>{
      window.location.href = "../quiz.html"
    }, {once: true} )
  }

  boxAnimationStart = () => {
    document.body.classList.add("box-up");
    document.body.classList.remove("box-down");
  };

  boxAnimationEnd = () => {
    document.body.classList.add("box-down");
    document.body.classList.remove("box-up");
    document.body.classList.remove("box-anim");
  };

  actualizarData() {
    const giftImgStr = this.preguntas[this.index];
    this.data[giftImgStr] = this.data[giftImgStr] ?? 0;
    this.data[giftImgStr]++;
    localStorage.setItem("preguntasQuiz", JSON.stringify(this.data));
  }

  manejarRespuestaUsuario = () => {
    document.body.classList.add("playGame")
    this.avanzarJuego();
    this.actualizarData();
    this.box.addEventListener("animationend", () =>  {
      if (this.intentosRestantes == 0){
        setTimeout(()=>{ this.endGame()}, 1000)
        return
      } 
    })
  }


  progreso(){
    let progreso = (((this.intentos - this.intentosRestantes+1) / this.intentos) * 100)
    if(this.intentosRestantes == 0){
      progreso = "100%"
    }
    return progreso
  }

  avanzarJuego = () => {
    if (!document.querySelector(".box-up")) {
      this.index = Math.floor(Math.random() * this.preguntas.length);
      const body = document.body;
      body.classList.add("box-anim");
      this.gift.src = `src/img/objects/${this.preguntas[this.index]}.png`;
      localStorage.setItem("preguntasQuiz", JSON.stringify(this.data));
      this.barra.style.width = `${this.progreso()}%`;
      this.intentosRestantes--;
    }
  };
}

export { MiniJuegoApp };
