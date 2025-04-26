const box = document.querySelector(".box");
const cantAp = document.querySelector(".cantAp")
const ui = document.querySelector(".ui")
const salud = document.querySelectorAll(".heart")
const container_cartel = document.getElementById("container-cartel")

let game_over = false;
let clickEvent = 0;
let cantRepetciones = JSON.parse(localStorage.getItem("cantRepeticiones")) || [];

let vidaIndex = salud.length - 1;

let correctos = [false, false, false, false, false, false, false]

const colores =  ["blanco","violeta","azul","magenta","naranja","rojo"];
const btn_ui =   ["reset", "plus", "check"]
const imgsHell = ["randbox.png","apple.png","cheese.png","hamburger.png","rocket.png","coin.png","box.png"]


function randomLista(array){
  let random_i =  Math.floor(Math.random() * array.length);
  return array[random_i];
}

imgsHell.map((src) =>{
  let nuevaImg = document.createElement('img');
  nuevaImg.src = `src/imgs/${src}`;
  //nuevaImg.style.display="none";
  nuevaImg.style.width="150px";
  nuevaImg.classList.add("elem");
  box.appendChild(nuevaImg);
})


btn_ui.map((src)=>{
	btnUI = document.createElement('img');
	btnUI.src = `ui/${src}.png`;
	btnUI.style.width = "50px";



switch (src) {
  case "plus":
    btnUI.classList.add("plusBtn")
    break;
  case "reset":
    btnUI.classList.add("resetBtn")
    break;
  default:
    btnUI.classList.add("checkBtn")
}

	ui.appendChild(btnUI);

});


const plusBtn = document.querySelector(".plusBtn")
const resetBtn = document.querySelector(".resetBtn")
const checkBtn = document.querySelector(".checkBtn")
const cartel = document.querySelector(".cartel")


let ultimaImgen = 0;


checkBtn.addEventListener('click', () => {
  cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";

  container_cartel.classList.add("cartel-on")

  if ( cantRepetciones[ultimaImgen] == Number(cantAp.innerHTML)) {
    document.querySelector(".cartel img").src="ui/like.png";
    correctos[ultimaImgen] = true;
  }else{
    document.querySelector(".cartel img").src="ui/skull.png";
	      salud[vidaIndex].src = "ui/heart_off.png"
	 	  if (vidaIndex == 0){
		       document.querySelector(".cartel img").src="ui/game-over.png";
      game_over = true;
    } else{
    vidaIndex --;
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
      if(game_over == false){
        container_cartel.classList.remove("cartel-on")
        cartel.style.opacity = cartel.style.opacity === "1" ? "0" : "1";
      } else{
        game_over = true
        cartel.style.opacity = "1";
        setTimeout( () => { window.location.href = "../score.html" }, 1200)
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
      game_over = true;

      document.querySelector(".cartel img").src="ui/win.png";
      cartel.style.opacity = "1";
      setTimeout( () => { 
        window.location.href = "../score.html";
      }, 1500)

      
      return;
  }

  // Mostrar la nueva imagen
  box.src = `src/imgs/${imgsHell[ultimaImgen]}`;
});
