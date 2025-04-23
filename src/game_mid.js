
const body = document.querySelector("body");
const randbox = document.querySelector(".randbox");
const randbox_img = document.querySelector(".randbox_img");
const randbox_msg = document.querySelector(".randbox_msg");
const cantAp = document.querySelector(".cantAp")
const ui = document.querySelector(".ui")


let clickEvent = 0;

colores = ["blanco","violeta","azul","magenta","naranja","rojo"];


btn_ui = ["reset", "plus", "check"]


imgsHell = ["https://i.ibb.co/99wS9TFX/randbox.png",
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
    const nuevaImg = document.createElement('img');
    nuevaImg.src = src;
    nuevaImg.style.display="none";
    nuevaImg.classList.add ="elem";
    randbox.appendChild(nuevaImg);
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


let ultimaImgen = 1;


checkBtn.addEventListener('click', () => {

    document.querySelector(".cartel h2").innerHTML="Respuesta Incorrecta!"
    if (cartel.style.opacity == "1"){
        cartel.style.opacity = "0";
    }else{
        cartel.style.opacity = "1";
    }
})

resetBtn.addEventListener('click', () => { 
    cantAp.innerHTML="0";
    cartel.style.opacity = "0";
 } )

plusBtn.addEventListener('click', () => {
    cantAp.innerHTML ++;
    cartel.style.opacity = "0";

});

randbox_img.addEventListener('click', () => {
    randbox_img.src = `${imgsHell[ultimaImgen]}`; 
    ultimaImgen++;
    cantAp.innerHTML = 0;
    if(ultimaImgen == imgsHell.length){
        ultimaImgen = 0;
    }
    cartel.style.opacity = "0";
}); 
