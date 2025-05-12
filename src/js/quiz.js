import { cantVidas } from "../../config.js";
import { JuegoQuizUI } from "./randbox.js";
import { } from "./test.js";


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

});




export {randboxQuiz, preguntasQuiz, checkBtn, cantAp}
