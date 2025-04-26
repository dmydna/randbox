import { gift_img, limitClicks } from "./config.js";

const box = document.querySelector(".box");
const gift = document.querySelector(".gift");
const REMAIN_GIFTS = document.querySelector(".remain_gifts");

// Creamos el mensaje final, pero escondido de entrada
const finalMessage = document.createElement("div");
finalMessage.textContent = "¡Última sorpresa!";
finalMessage.style.position = "absolute";
finalMessage.style.top = "10%";
finalMessage.style.width = "100%";
finalMessage.style.textAlign = "center";
finalMessage.style.fontSize = "1.5rem";
finalMessage.style.color = "#FF0000";
finalMessage.style.opacity = "0";
finalMessage.style.transition = "opacity 0.8s ease";
document.body.appendChild(finalMessage);

let clickEvent = false;
let cantRepetciones = new Array(gift_img.length).fill(0);
let cantClicks = limitClicks;

REMAIN_GIFTS.textContent = cantClicks;


box.addEventListener('click', () => {

    box.classList.remove("onload");

    if (cantClicks <= 0) return;

    // Desactivar los clicks por 3 segundos después de hacer click
    box.style.pointerEvents = "none";
    setTimeout(() => {
        box.style.pointerEvents = "auto";
    }, 3100);

    let rand_index =  Math.floor(Math.random() * gift_img.length);

    cantRepetciones[rand_index]++;
    
    gift.src = `/imgs/${gift_img[rand_index]}.png`;
    
    
    if (clickEvent === false){
        clickEvent = true;
        box.classList.add("tirarBox")
        gift.style.opacity="1";
    }else{
        clickEvent = false;
        box.classList.remove("tirarBox")
    }
    
    cantClicks--;

    REMAIN_GIFTS.textContent = cantClicks;

    if (cantClicks === 0) {
        // Mostrar mensaje de última sorpresa
        finalMessage.style.opacity = "1";

        clearTimeout();

        // Desactivar el botón (eliminar el eventListener)
        box.style.pointerEvents = "none";

        setTimeout(() => {
            window.location.href = "../src/pages/quiz.html";
        }, 3500);
    }

    localStorage.setItem("cantRepeticiones", JSON.stringify(cantRepetciones));
    

    // console.log(cantClicks);
    // console.log(imgActual);
    // console.log(cantRepetciones);
}); 


