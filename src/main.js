import { cantVidas, devMode, gift_img, limitClicks } from "../config.js";


const configDefault = {
  "menu":1,
  "progreso":1
  ,"vidas":3,
  "dificultad":4,
  "teclado":1,
  "velocidad":3,
  "memoria":1
}



const config  =  JSON.parse(localStorage.getItem("GameConfig")) || configDefault

function cargarEstilos(css1, css2){
  const link1 = document.querySelector('#theme-index')
  const link2 = document.querySelector('#theme-quiz')
  link1.disabled = css1
  link2.disabled = css2
}





// Precargar Imagenes

const pageStates = ['HOME', 'QUIZ', 'SCORE' ,'INFO']
let pageView = 'HOME'

const src_obj = "src/assets/img/objects/"
const src_pop = "src/assets/img/popup/"
const src_ui = "src/assets/img/ui/"


gift_img.map((src) => {
    let img = new Image();
    img.src = src_obj +`${src}.png`;
});

// (quizPage)

const ui_imgs =["like", "skull", "game-over","win"];

ui_imgs.map( (src, index) => {
  let img = new Image();
  img.src = src_pop + `${src}.png`;
})

export { 
   cantVidas, 
   devMode, 
   gift_img, 
   limitClicks, 
   src_obj, 
   src_pop, 
   src_ui, 
   pageView, 
   pageStates,
   configDefault,
   config,
   cargarEstilos
};
