
const body = document.querySelector("body");
const randbox = document.querySelector(".randbox");
const randbox_img = document.querySelector(".randbox_img");
const randbox_msg = document.querySelector(".randbox_msg");
let clickEvent = 0;

colores = ["blanco","violeta","azul","magenta","naranja","rojo"];

imgsHell = [
    "https://i.ibb.co/99wS9TFX/randbox.png",
    "https://i.ibb.co/cXcpC9mh/apple.png",
    "https://i.ibb.co/1f6QPcym/cheese.png",
    "https://i.ibb.co/8D5HhYFp/hamburger.png",
    "https://i.ibb.co/PsxZWmJj/rocket.png",
    "https://i.ibb.co/jPGm2323/coin.png",
    "https://i.ibb.co/Kj7YwTZW/box.png"
]

cantRepetciones = [0,0,0,0,0,0,0]

function randomLista(array){
    let random_i =  Math.floor(Math.random() * array.length);
    return array[random_i];
}


let ultimaImgen = "";
let cantClicks = 0;
let limitClicks = 10;

function toVerificacion() {
    let url = "../verificacion.html"
    window.location.href = url
}

randbox_img.addEventListener('click', () => {

    let random_i =  Math.floor(Math.random() * imgsHell.length);

    cantRepetciones[random_i]++

    // checkeo que las imgs sean distintas
    let imgActual = imgsHell[random_i];
    while(imgActual == ultimaImgen ){
        imgActual = imgsHell[random_i];
    }
    ultimaImgen = imgActual;
    
    randbox_img.classList.remove("onload");        
    randbox_msg.src = `${imgActual}`;
    
    // body.style.backgroundColor=`var(--bg-${randomLista(colores)} )`;
    
    if (clickEvent == 0){
        clickEvent=1;
        randbox_img.classList.add("tirarrandbox")
        randbox_msg.style.opacity="1";
    }else{
        clickEvent=0;
        randbox_img.classList.remove("tirarrandbox")
    }
    
    cantClicks++

    if (cantClicks === limitClicks) {
        let url = "../game_mid.html"
        window.location.href = url
    }

    localStorage.setItem("cantRepeticiones", JSON.stringify(cantRepetciones));

    console.log(cantClicks);
    console.log(imgActual);
    console.log(cantRepetciones);
}); 
