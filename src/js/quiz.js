import { cantVidas } from "../../config.js";
import { JuegoQuiz, ShuffleImgsAnim } from "./randbox.js";


const box = document.querySelector(".box")
const cantAp = document.querySelector(".cantAp")
const ui = document.querySelector(".ui")
const container = document.querySelector(".container")
const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz")) || {}
const preguntasQuizArray = Object.keys(preguntasQuiz)
const randboxQuiz = new JuegoQuiz(preguntasQuiz, cantVidas)
const shuffleImgs = new ShuffleImgsAnim( preguntasQuizArray, box)



const resetBtn = document.querySelector(".ltBtn")
const checkBtn = document.querySelector(".midBtn")
const plusBtn  = document.querySelector(".rtBtn")


const cartel   = document.querySelector(".popup")


// Precargar Imagenes


preguntasQuizArray.map( (src, index) => {
  let img = new Image();
  img.src = `src/img/objetos/${src}.png`;
})

const ui_imgs =["like", "skull", "game-over","win","open-box"];

ui_imgs.map( (src, index) => {
  let img = new Image();
  img.src = `src/img/ui/${src}.png`;
})


// box.onload = () => {   
//   box.style.opacity = "1";
//  }
// box.onerror = () => {   box.src = 'src/img/ui/open-box.png'; }


// barra de salud (corazones)

for(let i=0;i < randboxQuiz.intentosRestantes ;i++){
  let heart = document.createElement('i');
  heart.classList.add("fi");
  heart.classList.add("fi-ss-heart");
  heart.style.fontSize = "20px";
  heart.style.color = "red"
  document.querySelector(".salud").appendChild(heart);
}

// botones  GameOver / Win

const tryAgainBtn = document.createElement('i');
tryAgainBtn.classList.add("fi")
tryAgainBtn.classList.add("fi-rr-rotate-left")
tryAgainBtn.classList.add("tryAgainBtn")

const verScoreBtn = document.createElement('i');
verScoreBtn.classList.add("fi")
verScoreBtn.classList.add("fi-rr-play-circle")
verScoreBtn.classList.add("verScoreBtn")



tryAgainBtn.addEventListener('click', () => {

  /* Resetea juego */

  const popup_container = document.querySelector(".popup-container")
  const corazones = document.querySelectorAll(".salud .fi")
  const barraCorrazones = document.querySelector(".salud")
  const barra_estado = document.querySelector(".carga")

  document.querySelector(".popup img").src ="src/img/ui/again.png";

  /* Resetea el Objeto Quiz */
  randboxQuiz.intentarDeNuevo();
  tryAgainBtn.remove();
  verScoreBtn.remove();

  /* resetea corazones */
  barraCorrazones.style.display = "flex"
  let i = 0
  let relife =  setInterval( ()=> {
    corazones[i].classList.remove("fi-rr-heart")
    corazones[i].classList.add("fi-ss-heart")
    i++
  },500 )



  shuffleImgs.shuffleAnimate( ()=>{
    let img = randboxQuiz.obtenerPreguntaActual()

    /*Resetea todo despues de la animacion shuffle */
    barra_estado.style.width =`${randboxQuiz.getProgreso()}%`;
    box.src = `src/img/objetos/${img}.png`
    popup_container.classList.remove("overlay")
    cartel.style.opacity = "0"
    cantAp.innerHTML = "0";
    clearInterval(relife)

    return // importante
  })
  
})

verScoreBtn.addEventListener('click', () => {
  document.body.classList.add('slide-out-left')

  document.body.addEventListener('animationend', () => {
    window.location.href = "../score.html"
  })
  
  
})



// Importante! Primera imagen de gift

box.src = `src/img/objetos/${randboxQuiz.obtenerPreguntaActual()}.png`






/* Click Handlers */

const checkBtnClickHandler = (e) => {

  e.stopPropagation()

  const barraCorrazones = document.querySelector(".salud")
  const corazones = document.querySelectorAll(".salud .fi")
  const popup_container = document.querySelector(".popup-container")
  const puntos = document.querySelector(".puntos")
  const barra_estado = document.querySelector(".carga")

  cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";
  puntos.style.opacity = puntos.style.opacity === "1" ? "0" : "1";

  /* impide que se haga click cuando aparece el cartel*/
  popup_container.classList.add("overlay")

  /* Responde Bien */ 

  if ( randboxQuiz.verificarRespuesta(cantAp.innerHTML) ) {
  
    document.querySelector(".popup img").src="src/img/ui/like.png";
    puntos.innerHTML = "+" + randboxQuiz.incPuntaje()
    puntos.style.color = "green"

    if(! randboxQuiz.haTerminado()){
      setTimeout( () => { 
        box.click();
        popup_container.classList.remove("overlay")

        // if(shuffleImgs){
        //   document.body.style.pointerEvents = 'none'
        // }

        puntos.style.opacity = puntos.style.opacity === "1" ? "0" : "1";
      }, 1200)
    }

    barra_estado.style.width =`${randboxQuiz.getProgreso()}%`

    
  }else{

    /* Responde Mal */ 

    document.querySelector(".popup img").src ="src/img/ui/skull.png";
    corazones[randboxQuiz.intentosRestantes].classList.remove("fi-ss-heart")
	      corazones[randboxQuiz.intentosRestantes].classList.add("fi-rr-heart")
    puntos.innerHTML = "-" + randboxQuiz.decPuntaje()
    puntos.style.color = "red"

    if (! randboxQuiz.haTerminado()){
      setTimeout( ()=> { 
        popup_container.classList.remove("overlay")

        cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";
        puntos.style.opacity = puntos.style.opacity === "1" ? "0" : "1";
      } , 1200 )

    }

  }


  /* El Juego Termino */

  if(randboxQuiz.haTerminado()){

    /* Pierde */
    if (randboxQuiz.haPerdido()){

      document.querySelector(".popup img").src="src/img/ui/game-over.png";
      puntos.style.opacity = "0";
      cartel.style.opacity = "1";
      cartel.appendChild(tryAgainBtn);
      barraCorrazones.style.display = "none";

  
    }else {
    /*  Gana */  
      document.querySelector(".popup img").src="src/img/ui/win.png";
      puntos.style.opacity = 0;
      cartel.style.opacity = "1";
      cartel.appendChild(verScoreBtn);
      barraCorrazones.style.display = 'none';  
    }
  }

  localStorage.setItem("score", JSON.stringify(randboxQuiz.puntaje));


}

const boxClickHandler = (e) => {

  e.stopPropagation();

  cartel.style.opacity = "0";
  cantAp.innerHTML = "0";

  /* Si el juego termina no cambia de imagen */

  if (! randboxQuiz.haTerminado() ){

    /* Si la animacion esta activa*/

    if(shuffleImgs){
      document.body.style.pointerEvents = 'none'
      // incia la animacion y ejecuta una funcion handler al finalizar
      shuffleImgs.shuffleAnimate( (imagen, index) => { 
        document.body.style.pointerEvents = 'auto';
        return randboxQuiz.siguientePregunta()
      })

    }else{

     /* por default*/
      const imgGift = randboxQuiz.siguientePregunta()
      box.src = `src/img/objetos/${imgGift}.png`
    }

    localStorage.setItem("score", JSON.stringify(randboxQuiz.puntaje));
  }


}


/* Eventos */

box.addEventListener('click', boxClickHandler);

checkBtn.addEventListener('click', checkBtnClickHandler )

resetBtn.addEventListener('click', (e) => { 
  e.stopPropagation();
  cantAp.innerHTML="0";
})

plusBtn.addEventListener('click', () => {
  cantAp.innerHTML ++;
});


container.addEventListener('click', (e)=>{ 
  // fix
  if(! document.querySelector(".overlay")){
    cantAp.innerHTML ++;
  }
  e.stopPropagation();
});


ui.addEventListener('click',(e) =>  {
  // fix 
  e.stopPropagation()
})


/*animaciones */

box.addEventListener('mouseover', ()=> {
  box.classList.remove("focus")
  box.style.animationName = "vibrate-3"
})

box.addEventListener('mouseout',() =>{
  box.style.animationName = "none"
})



checkBtn.addEventListener('mouseover', () => {
  checkBtn.children[0].classList.remove('fi-rr-social-network')
  checkBtn.children[0].classList.add('fi-ss-social-network')
  
} )

checkBtn.addEventListener('mouseout',() =>{
  checkBtn.children[0].classList.remove('fi-ss-social-network')
  checkBtn.children[0].classList.add('fi-rr-social-network')
})

