import { gift_img, limitClicks } from "../../config.js";


const box = document.querySelector(".box");
const gift = document.querySelector(".gift");



let clickEvent = 0;
let cantClicks = limitClicks;




const preguntasQuiz = {}
gift_img.forEach( (img) => {
     preguntasQuiz[img] = 0;
    } 
)

const preguntasQuizArray = Object.keys(preguntasQuiz)

// Precargar Imagenes


preguntasQuizArray.map( (src, index) => {
  let img = new Image();
  img.src = `src/img/objetos/${src}.png`;
})




box.addEventListener('click', () => {

    const barra_carga = document.querySelector(".barraCarga")
    const carga = document.querySelector(".carga")

    carga.style.width =`${((limitClicks - cantClicks + 1) / limitClicks) * 100}%`
    barra_carga.style.opacity = ".5"

    if(cantClicks <= 0){
        window.location.href = "../quiz.html"
        return
    }

    if (cantClicks == 1) {
        document.querySelector(".barraCarga").style.opacity = 0;

        setInterval( () => {

            box.style.opacity = 0
            gift.style.visibility = "hidden"
            box.src = "src/img/ui/play.png";
            box.onload =  () => {
                box.style.opacity = "1";
                box.classList.add("sacudir");
            }
        }, 3000)
    }



    box.classList.remove("onload");    

    let rand_index =  Math.floor(Math.random() * gift_img.length);

    let giftImgStr = gift_img[rand_index]

    preguntasQuiz[giftImgStr] = preguntasQuiz[giftImgStr] ?? 0 
    preguntasQuiz[giftImgStr] ++ 

    
    gift.src = `src/img/objetos/${gift_img[rand_index]}.png`;
    
    
    if (clickEvent == 0){
        clickEvent=1;
        box.classList.add("tirarBox")
        gift.style.opacity="1";
    }else{
        clickEvent=0;
        box.classList.remove("tirarBox")
    }


    cantClicks--;

    localStorage.setItem("preguntasQuiz", JSON.stringify(preguntasQuiz));
}); 

