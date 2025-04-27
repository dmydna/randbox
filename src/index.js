import { gift_img, limitClicks, cantidadDeIntentos } from "./config.js";

const box = document.querySelector(".box");
const gift = document.querySelector(".gift");
let intentos = cantidadDeIntentos;

localStorage.setItem("intentos", JSON.stringify(intentos));

let clickEvent = 0;
let cantRepetciones = new Array(gift_img.length).fill(0);
let cantClicks = limitClicks;




box.addEventListener('click', () => {

    document.querySelector(".carga").style.width =`${((limitClicks - cantClicks + 1) / limitClicks) * 100}%`


    if(cantClicks <= 0){
        window.location.href = "../quiz.html"
        return
    }

    if (cantClicks == 1) {
        document.querySelector(".barraCarga").style.opacity = 0;

        setInterval( () => {
            //window.location.href = "../quiz.html"

            box.style.opacity = 0
            gift.style.visibility = "hidden"
            box.src = "ui/play.png";
            box.onload =  () => {
                box.style.opacity = "1";
                box.classList.add("sacudir");
            }
        }, 3000)
    }



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

    localStorage.setItem("cantRepeticiones", JSON.stringify(cantRepetciones));
    

    // console.log(cantClicks);
    // console.log(imgActual);
    // console.log(cantRepetciones);
}); 


