import { QuizApp } from "./Modules/QuizApp.js";
import { hoverClassToggle, hoverFlatIcon } from "./Modules/navbar.js";
import { } from "./Modules/test.js";
import { cantVidas, devMode } from './main.js';




const GameConfig =  JSON.parse(localStorage.getItem("GameConfig")) ?? {}


let  vidas = GameConfig['vidas']

if(devMode){
  vidas = cantVidas
}


const box = document.querySelector(".box")
const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz")) || {}
const preguntasQuizArray = Object.keys(preguntasQuiz)
const randboxQuiz = new QuizApp(preguntasQuiz, vidas)
const checkBtn = document.querySelector(".midBtn")
const plusBtn = document.querySelector(".rtBtn")
const cantAp = document.querySelector(".user-reply")



document.onload = randboxQuiz.iniciarJuego()
document.onload = document.body.classList.add("onload")
box.addEventListener('animationend', ()=>{document.body.classList.remove('onload')}, {once :true})




/*animaciones */


hoverFlatIcon(checkBtn,'ss')
hoverClassToggle(box,'vibrate-3')




/* eventos de teclado */

document.addEventListener('keydown', function(event) {
  if (event.key == 'Enter') {
    if(document.body.className.includes("user-loses","user-wins")){
      document.querySelector(".popup-btn").click()
      return
    }
  checkBtn.click()
  }
  if (event.key == '+') {
    plusBtn.click()
  }
  if (event.key == ' ') {
    plusBtn.click()
  }
});




export { cantAp, checkBtn, preguntasQuiz, randboxQuiz };

