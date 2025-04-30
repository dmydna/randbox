import { btn_ui, cantVidas} from "./config.js";
import { JuegoQuiz } from "./randbox.js";


const box = document.querySelector(".box");
const cantAp = document.querySelector(".cantAp")
const ui = document.querySelector(".ui")


const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz")) || {}
const randboxQuiz = new JuegoQuiz(preguntasQuiz, cantVidas)


// barra de salud (corazones)

for(let i=0;i < randboxQuiz.intentosRestantes ;i++){
  let heart = document.createElement('img');
  heart.src = "ui/heart.png";
  heart.classList.add("heart");
  heart.width = 20;
  document.querySelector(".salud").appendChild(heart);
}

// botones  GameOver / Win

const tryAgainBtn = document.createElement('img');
tryAgainBtn.src= "ui/reset2.png"
tryAgainBtn.width=30;
tryAgainBtn.classList.add("tryAgainBtn")

const verScoreBtn = document.createElement('img');
verScoreBtn.src = "ui/play.png"
verScoreBtn.width =30;
verScoreBtn.classList.add("verScoreBtn")


// botones de accion 

btn_ui.forEach((src, index)=>{
  let btnUI = document.createElement('img');
  btnUI.src = `ui/${src}.png`;
  btnUI.width = 50;

  switch (index) {
    case 0:
      btnUI.classList.add("resetBtn")
      break;
    case 1:
      btnUI.classList.add("plusBtn")
      break;
    default:
      btnUI.classList.add("checkBtn")
  }
  ui.appendChild(btnUI);

});


const plusBtn  = document.querySelector(".plusBtn")
const resetBtn = document.querySelector(".resetBtn")
const checkBtn = document.querySelector(".checkBtn")
const cartel   = document.querySelector(".cartel")


tryAgainBtn.addEventListener('click', () => {
  window.location.href = "../quiz.mob.html"; 
})

verScoreBtn.addEventListener('click', () => {
  window.location.href = "../score.html"
})



// Importante! Primera imagen de gift
box.src = `src/imgs/${randboxQuiz.obtenerPreguntaActual()}.png`



checkBtn.addEventListener('click', () => {

  const barra_estado = document.querySelector(".carga")
  const barraCorrazones = document.querySelector(".salud")
  const corazones = document.querySelectorAll(".heart")
  const container_cartel = document.getElementById("container-cartel")
  const puntos = document.querySelector(".puntos")

  cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";
  puntos.style.opacity = puntos.style.opacity === "1" ? "0" : "1";

  /* impide que se haga click cuando aparece el cartel*/
  container_cartel.classList.add("cartel-on")


  /* Responde Bien */ 

  if ( randboxQuiz.verificarRespuesta(cantAp.innerHTML) ) {
  
    document.querySelector(".cartel img").src="ui/like.png";
    puntos.innerHTML = "+3000"
    puntos.style.color = "green"

    if(! randboxQuiz.haTerminado()){
      setTimeout( () => { 
        box.click();
        container_cartel.classList.remove("cartel-on")
        puntos.style.opacity = puntos.style.opacity === "1" ? "0" : "1";
      }, 1200)
    }

    randboxQuiz.siguientePregunta();

    barra_estado.style.width =`${((randboxQuiz.quiz.cantPreguntas - randboxQuiz.preguntasDisponibles.length + 1) / randboxQuiz.quiz.cantPreguntas) * 100}%`
    
  }else{

    /* Responde Mal */ 

    document.querySelector(".cartel img").src ="ui/skull.png";
	      corazones[randboxQuiz.intentosRestantes].src = "ui/heart_off.png"
    puntos.innerHTML = "-3000"
    puntos.style.color = "red"

    if (! randboxQuiz.haTerminado()){
      setTimeout( ()=> { 
        container_cartel.classList.remove("cartel-on")
        cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";
        puntos.style.opacity = puntos.style.opacity === "1" ? "0" : "1";
      } , 1200 )

    }

  }


  /* El Juego Termino */

  if(randboxQuiz.haTerminado()){

    /* Pierde */
    if (randboxQuiz.haPerdido()){

      document.querySelector(".cartel img").src="ui/game-over.png";
      puntos.style.opacity = "0";
      cartel.style.opacity = "1";
      cartel.style.transform ="scale(1.5)"
      cartel.appendChild(tryAgainBtn);
      barraCorrazones.style.display = "none";

  
    }else {
    /*  Gana */  
      document.querySelector(".cartel img").src="ui/win.png";
      puntos.style.opacity = 0;
      cartel.style.opacity = "1";
      cartel.style.transform ="scale(1.5)"
      cartel.appendChild(verScoreBtn);
      barraCorrazones.style.display = 'none';
  
    }
  }

  localStorage.setItem("score", JSON.stringify(randboxQuiz.puntaje));


})


resetBtn.addEventListener('click', () => { 
  cartel.style.opacity = "0";
  cantAp.innerHTML="0";
})

plusBtn.addEventListener('click', () => {
  cantAp.innerHTML ++;
  cartel.style.opacity = "0";
});



box.addEventListener('click', () => {
  
  const imgGift = randboxQuiz.siguientePregunta()

  cartel.style.opacity = "0";
  cantAp.innerHTML = "0";

  /* Si el juego termina no cambia de imagen */

  if (! randboxQuiz.haTerminado() ){
    box.src = `src/imgs/${imgGift}.png`
    localStorage.setItem("score", JSON.stringify(randboxQuiz.puntaje));
  }


});


