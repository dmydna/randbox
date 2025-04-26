import { gift_img, limitClicks } from "./config.js";

const box = document.querySelector(".box");
const gift = document.querySelector(".gift");

let clickEvent = 0;
let cantRepetciones = new Array(gift_img.length).fill(0);
let cantClicks = limitClicks;


box.addEventListener('click', () => {

    box.classList.remove("onload");    

    let rand_index =  Math.floor(Math.random() * gift_img.length);

    cantRepetciones[rand_index]++;
    
    gift.src = `src/imgs/${gift_img[rand_index]}.png`;
    
    
    if (clickEvent == 0){
        clickEvent=1;
        box.classList.add("tirarBox")
        gift.style.opacity="1";
    }else{
        clickEvent=0;
        box.classList.remove("tirarBox")
    }
    
    cantClicks--;

    if (cantClicks == 0) {
        window.location.href = "../src/pages/quiz.html"
    }

    localStorage.setItem("cantRepeticiones", JSON.stringify(cantRepetciones));
    

    // console.log(cantClicks);
    // console.log(imgActual);
    // console.log(cantRepetciones);
}); 


