import { btn_ui, cantVidas, gift_img } from "./config.js";


let game_end = false;

const box = document.querySelector(".box");
const cantAp = document.querySelector(".cantAp")
const ui = document.querySelector(".ui")
const container_cartel = document.getElementById("container-cartel")
const saludBar = document.querySelector(".salud")

let cantRepetciones = JSON.parse(localStorage.getItem("cantRepeticiones")) || [];
let vida = cantVidas - 1;
let correctos = new Array(gift_img.length).fill(false);



// crea los corazones de la barra de salud
for(let i=0;i < cantVidas;i++){
  let heart = document.createElement('img');
  heart.src = "/ui/heart.png";
  heart.classList.add("heart");
  heart.width = 20;
  document.querySelector(".salud").appendChild(heart);
}

const salud = document.querySelectorAll(".heart")


btn_ui.forEach((src, index)=>{
	let btnUI = document.createElement('img');
	btnUI.src = `/ui/${src}.png`;
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


let ultimaImgen = 0;


// importante la primer imagen al cargar el quiz
box.src = `/imgs/${gift_img[0]}.png`


// juego terminado
let tryAgainBtn = document.createElement('img');
tryAgainBtn.src= "/ui/reset2.png"
tryAgainBtn.width=30;
tryAgainBtn.classList.add("tryAgainBtn")

let verScoreBtn = document.createElement('img');
verScoreBtn.src = "/ui/play.png"
verScoreBtn.width =30;
verScoreBtn.classList.add("verScoreBtn")

tryAgainBtn.addEventListener('click', () => {window.location.href = "../pages/quiz.html"} )
verScoreBtn.addEventListener('click', () => {window.location.href = "../pages/score.html"})




checkBtn.addEventListener('click', () => {
  cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";

  /* impide que se haga click cuando aparece el cartel*/
  container_cartel.classList.add("cartel-on")

  if ( cantRepetciones[ultimaImgen] == Number(cantAp.innerHTML)) {
    document.querySelector(".cartel img").src="/ui/like.png";
    correctos[ultimaImgen] = true;
  }else{
    document.querySelector(".cartel img").src="/ui/skull.png";
	      salud[vida].src = "/ui/heart_off.png"
	 	  if (vida == 0){
		       document.querySelector(".cartel img").src="/ui/game-over.png";
      cartel.appendChild(tryAgainBtn);
      cartel.style.transform ="scale(1.5)"
      saludBar.style.display = "none";
      game_end = true;
    } else{
    vida --;
   } 
  }

  console.log(correctos);

	//si la respuesta es correcta pasa a la sig imagen
	if (correctos[ultimaImgen]){
		setTimeout( () => { 
        box.click();
        container_cartel.classList.remove("cartel-on")
  }, 1200) 
	} else {
    setTimeout( () => { 
      if(game_end == false){
        container_cartel.classList.remove("cartel-on")
        cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";
      } else{
        game_end = true
        cartel.style.opacity = "1";
      }
  }, 1200)
 }
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
  console.log(`Imagen actual: ${ultimaImgen}`);

  cartel.style.opacity = "0";
  cantAp.innerHTML = "0";

  // Buscar la próxima imagen que no haya sido respondida correctamente
  let siguienteEncontrado = false;

  for (let i = 0; i < correctos.length; i++) {
    let index = (ultimaImgen + 1 + i) % correctos.length;
    if (!correctos[index]) {
      ultimaImgen = index;
      siguienteEncontrado = true;
      break;
    }
  }

  if (!siguienteEncontrado) {
      // Si todas están respondidas correctamente, terminar el juego
      game_end = true;
      document.querySelector(".cartel img").src="/ui/win.png";
      cartel.style.opacity = "1";
      cartel.style.transform ="scale(1.5)"
      cartel.appendChild(verScoreBtn);
      saludBar.style.display = 'none';

      return;
  }

  // Mostrar la nueva imagen
  box.src = `/imgs/${gift_img[ultimaImgen]}.png`;
});


