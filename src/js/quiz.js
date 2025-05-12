import { cantVidas } from "../../config.js";
import { JuegoQuizUI } from "./randbox.js";


const box = document.querySelector(".box")
const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz")) || {}
const preguntasQuizArray = Object.keys(preguntasQuiz)
const randboxQuiz = new JuegoQuizUI(preguntasQuiz, cantVidas)
const checkBtn = document.querySelector(".midBtn")
const plusBtn = document.querySelector(".rtBtn")
const cantAp = document.querySelector(".cantAp")


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


document.onload = randboxQuiz.iniciarJuego()

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



function ganarJuego(event){
  // ganar el juego sin usar UI
  if (event.key == 'g') {
    const intervalo = setInterval ( ()=> {
      let pregunta = randboxQuiz.juego.obtenerPreguntaActual()
      let respuesta = preguntasQuiz[pregunta]
      console.log(pregunta)
      randboxQuiz.juego.verificarRespuesta(respuesta)
      pregunta = randboxQuiz.juego.siguientePregunta()
      if(randboxQuiz.juego.haTerminado()){
        checkBtn.click()
        clearInterval(intervalo)
      }
    }, 50 )

  }
}


function perderJuego(event){
  // ganar el juego sin usar UI
  if (event.key == 'p') {
    const intervalo = setInterval ( ()=> {
      let pregunta = randboxQuiz.juego.obtenerPreguntaActual()
      let respuesta = Number(preguntasQuiz[pregunta])+1
      console.log(pregunta)
      randboxQuiz.juego.verificarRespuesta(respuesta)
      pregunta = randboxQuiz.juego.siguientePregunta()
      if(randboxQuiz.juego.haTerminado()){
        checkBtn.click()
        clearInterval(intervalo)
      }
    }, 50 )

  }
}


function mostrarRespuesta(event){
  // pierde el juego sin usar UI
  if (event.key == 'r') {
    let pregunta = randboxQuiz.juego.obtenerPreguntaActual()
    let respuesta = preguntasQuiz[pregunta]
    cantAp.innerHTML = respuesta
    cantAp.style.color = "red"
    setTimeout(()=>{  cantAp.style.color = "black" }, 1000)
  }
}


/* eventos de teclado */

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
  ganarJuego(event) // key 'g'
  mostrarRespuesta(event) // key 'r'
  perderJuego(event) // key 'p'
});

