const body = document.querySelector("body");
const randbox_img = document.querySelector(".randbox_img");
const randbox = document.querySelector(".randbox");
const randbox_msg = document.querySelector(".randbox_msg");
const cantAp = document.querySelector(".cantAp")
const ui = document.querySelector(".ui")
const salud = document.querySelectorAll(".heart")


let clickEvent = 0;
let cantRepetciones = JSON.parse(localStorage.getItem("cantRepeticiones")) || [];
let vidaIndex = salud.length - 1;

console.log(cantRepetciones);

correctos = [false, false, false, false, false, false, false]

colores = ["blanco","violeta","azul","magenta","naranja","rojo"];


btn_ui = ["reset", "plus", "check"]


imgsHell = [
  "https://i.ibb.co/99wS9TFX/randbox.png",
  "https://i.ibb.co/cXcpC9mh/apple.png",
  "https://i.ibb.co/1f6QPcym/cheese.png",
  "https://i.ibb.co/8D5HhYFp/hamburger.png",
  "https://i.ibb.co/PsxZWmJj/rocket.png",
  "https://i.ibb.co/jPGm2323/coin.png",
  "https://i.ibb.co/Kj7YwTZW/box.png"
]


function randomLista(array){
  let random_i =  Math.floor(Math.random() * array.length);
  return array[random_i];
}

imgsHell.map((src) =>{
  let nuevaImg = document.createElement('img');
  nuevaImg.src = src;
  //nuevaImg.style.display="none";
  nuevaImg.style.width="150px";
  nuevaImg.classList.add("elem");
  randbox_img.appendChild(nuevaImg);
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

  if ( cantRepetciones[ultimaImgen] == Number(cantAp.innerHTML)) {
    document.querySelector(".cartel h2").innerHTML="Respuesta Correcta!";
    correctos[ultimaImgen] = true;
  }else{
    document.querySelector(".cartel h2").innerHTML="Respuesta Incorrecta!";
	 salud[vidaIndex].src = "ui/heart_off.png"
	 	if (vidaIndex == 0){
		 document.querySelector(".cartel h2").innerHTML="Game Over!"
      } else{
      vidaIndex --;
   } 
  }

  console.log(correctos);

	//si la respuesta es correcta pasa a la sig imagen
	if (correctos[ultimaImgen]){
		setTimeout( () => { randbox_img.click() }, 1000) 
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

randbox_img.addEventListener('click', () => {
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
      window.location.href = "../game_end.html";
      return;
  }

  // Mostrar la nueva imagen
  randbox_img.src = imgsHell[ultimaImgen];
  console.log(`Nueva imagen: ${ultimaImgen}`);
});
