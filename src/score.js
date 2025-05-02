import { btn_ui } from './config.js';


const randbox = document.querySelector(".randbox");
const resetBtn = document.querySelector('.resetBtn')
const ui = document.querySelector(".ui")
const score_container = document.querySelector(".score")

const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz"));
const puntuacion = JSON.parse(localStorage.getItem("score"));



score_container.innerHTML = `score: ${puntuacion}`;


resetBtn.addEventListener('click', () => { window.location.href = "../index.html" } )


for (const clave in preguntasQuiz) {
  if (preguntasQuiz.hasOwnProperty(clave)) { 
    
    const valor = preguntasQuiz[clave];
    
    const nuevaImg = document.createElement('img');
    const imgContainer = document.createElement('div');
    const cantAp = document.createElement("h2");

    nuevaImg.classList.add("gift")
    cantAp.classList.add("cantAp")
    imgContainer.classList.add("imgContainer")

    cantAp.innerHTML = valor;
    nuevaImg.src = `src/imgs/${clave}.png`;
  
    imgContainer.appendChild(nuevaImg);
    imgContainer.appendChild(cantAp);

    randbox.appendChild(imgContainer);

  }
}



  //localStorage.clear();
