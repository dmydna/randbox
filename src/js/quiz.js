import { cantVidas, test } from "../../config.js";
import { JuegoQuiz, ShuffleImgsAnim } from "./randbox.js";



const box = document.querySelector(".box")
const resetBtn = document.querySelector(".ltBtn")
const checkBtn = document.querySelector(".midBtn")
const plusBtn  = document.querySelector(".rtBtn")
const popupBtn = document.querySelector(".popup-btn")
const cantAp = document.querySelector(".user-reply")
const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz")) || {}
const preguntasQuizArray = Object.keys(preguntasQuiz)
const randboxQuiz = new JuegoQuiz(preguntasQuiz, cantVidas)
const shuffleImgs = new ShuffleImgsAnim( preguntasQuizArray, box)



document.onload = cargarTest(test)

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



// barra de salud (corazones)

const barraCorrazones = document.querySelector(".heart-bar")
for (let i = 0; i < randboxQuiz.intentosRestantes; i++) {
  let heart = document.createElement("i");
  heart.classList.add("fi", "fi-ss-heart");
  barraCorrazones.appendChild(heart);
}


function jugarOtraVez(){


  const body = document.body
  const popupBtn = document.querySelector(".popup-btn")
  const popupImg = document.querySelector(".popup-ico")
  const corazones = document.querySelectorAll(".heart-bar .fi")
  const cantAp = document.querySelector(".user-reply")
  const barraProgreso = document.querySelector(".progress-bar")

  body.classList.remove('user-loses','user-wins');
  body.classList.add('user-restart-game');
  randboxQuiz.intentarDeNuevo();
  popupBtn.classList.remove("fi","fi-rr-rotate-left","tryAgainBtn");
  popupImg.src = "src/img/ui/again.png";

  // se ejecutan dos animaciones y se actualiza la ui al finalizar
  let i = 0;
  i = i % corazones.length
  let anim = setInterval(() => {
      corazones[i].classList.remove("fi-rr-heart");
      corazones[i].classList.add("fi-ss-heart");
      i++;
      if(i==corazones.length){
        clearInterval(anim)
      }
  }, 500);

  shuffleImgs.shuffleAnimate(() => {
    barraProgreso.style.width = `${randboxQuiz.getProgreso()}%`;
    cantAp.innerHTML = "0";
    body.classList.remove("user-restart-game");
    return randboxQuiz.obtenerPreguntaActual(); //importante
  });
}


popupBtn.addEventListener("click", () => {

  if (randboxQuiz.estado == "user-loses") {
    /* Reiniciar juego */
    jugarOtraVez();
  } 
  if(randboxQuiz.estado == "user-wins"){
    /* ver score */
    document.body.classList.add("slide-out-left");
    document.body.addEventListener('animationend', ()=>{
      window.location.href ="../score.html"
    })
  }
 }
)
// Importante! Primera imagen de gift

box.src = `src/img/objetos/${randboxQuiz.obtenerPreguntaActual()}.png`



/* Click Handlers */

const manejarRespuestaUsuario = (e) => {

  e.stopPropagation()

  const corazones = document.querySelectorAll(".heart-bar .fi")
  const puntos = document.querySelector(".points")
  const barraProgreso = document.querySelector(".progress-bar")
  const popupImg = document.querySelector(".popup-ico")
  const body = document.body
  const cantAp = document.querySelector(".user-reply")

  /* Responde Bien */ 

  if ( randboxQuiz.verificarRespuesta(cantAp.innerHTML) ) {
  
    popupImg.src="src/img/ui/like.png";
    puntos.innerHTML = "+" + randboxQuiz.incPuntaje()
    body.classList.add("user-reply-succeeded");
    randboxQuiz.estado = "user-reply-succeeded"

    if(! randboxQuiz.haTerminado()){
      setTimeout( () => { 
        box.click();
        body.classList.remove("user-reply-succeeded");
      }, 1200)
    }

    barraProgreso.width =`${randboxQuiz.getProgreso()}%`

    
  }else{

    /* Responde Mal */ 

    popupImg.src ="src/img/ui/skull.png";
    randboxQuiz.estado = "user-reply-failed"

    setTimeout( ()=>{ 
      corazones[randboxQuiz.intentosRestantes].classList.remove("fi-ss-heart"); 
    } ,800)

    corazones[randboxQuiz.intentosRestantes].classList.add("fi-rr-heart") 
    puntos.innerHTML = "-" + randboxQuiz.decPuntaje()
    body.classList.add("user-reply-failed");

    if (! randboxQuiz.haTerminado()){
      setTimeout( ()=> { 
        body.classList.remove("user-reply-failed");
      } , 1200 )

    }

  }


  /* El Juego Termino */

  if(randboxQuiz.haTerminado()){

    body.classList.remove("user-reply-succeeded", "user-reply-failed");
    /* Pierde */
    if (randboxQuiz.haPerdido()){
      randboxQuiz.estado = "user-loses"
      body.classList.add("user-loses");
      popupImg.src="src/img/ui/game-over.png";
      popupBtn.classList.add("fi","fi-rr-rotate-left","tryAgainBtn");
    }else {
    /*  Gana */  
      randboxQuiz.estado = "user-wins"
      body.classList.add("user-wins");
      popupImg.src="src/img/ui/win.png";
      popupBtn.classList.add("fi", "fi-rr-play-circle", "verScoreBtn");
    }
  }

  localStorage.setItem("score", JSON.stringify(randboxQuiz.puntaje));


}

const avanzarJuego = (e) => {
  e.stopPropagation();

  const cantAp = document.querySelector(".user-reply")
  const body = document.body

  cantAp.innerHTML = "0";

  /* Si el juego termina no cambia de imagen */

  if (! randboxQuiz.haTerminado() ){

    /* Si la animacion esta activa*/

    if(shuffleImgs){
      body.style.pointerEvents = 'none'
      // incia la animacion y ejecuta una funcion handler al finalizar
      shuffleImgs.shuffleAnimate( () => { 
        body.style.pointerEvents = 'auto';
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

box.addEventListener('click', avanzarJuego);

checkBtn.addEventListener('click', manejarRespuestaUsuario )

resetBtn.addEventListener('click', (e) => { 
  e.stopPropagation();
  const cantAp = document.querySelector(".user-reply")
  cantAp.innerHTML="0";
})

plusBtn.addEventListener('click', () => {
  const cantAp = document.querySelector(".user-reply")
  cantAp.innerHTML ++;
});


cantAp.addEventListener('click', (e)=>{ 
  // fix
  const cantAp = document.querySelector(".user-reply")
  cantAp.innerHTML ++;
  e.stopPropagation();
});


document.addEventListener('keydown', function(event) {
  if (event.key == 'Enter') {
    checkBtn.click()
  }
  if (event.key == '+') {
    plusBtn.click()
  }
  if (event.key == ' ') {
    plusBtn.click()
  }

});


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




function cargarTest (test) { 
  if(test){ 
    import('./test.js') 
  }
}



export {randboxQuiz, preguntasQuiz, checkBtn, cantAp}