import { gift_img, limitClicks } from "../../config.js";


const box = document.querySelector(".box");
const gift = document.querySelector(".gift");
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



box.addEventListener('animationstart' , ()=> {
     gift.style.opacity =  "1"
} )


box.addEventListener('animationend', ()=>{

    gift.style.opacity =  "0"

    if(cantClicks == 0){
        document.querySelector(".barraCarga").style.opacity = "0";
        box.style.animationDuration = '0.5s'
        box.style.animationName = 'scale-out-center'
        cantClicks --
    }
    if( cantClicks < 0){
        box.style.opacity = "0"
        setTimeout( ()=>{window.location.href = "../quiz.html"}, 500 ) 
    }

});




box.addEventListener('click', (e) => {

    e.stopPropagation()

    const barraCarga = document.querySelector('.barraCarga')
    const carga = document.querySelector(".carga")

    box.style.animationName =  box.style.animationName == 'lanzar-box-1' ? 'lanzar-box-2' : 'lanzar-box-1'
    box.classList.remove("onload"); 

    gift.style.opacity = (gift.style.opacity == '0') ? '1' : '0'
    barraCarga.style.opacity =  ".5"
    carga.style.width =`${((limitClicks - cantClicks + 1) / limitClicks) * 100}%`

    let rand_index =  Math.floor(Math.random() * gift_img.length);
    let giftImgStr = gift_img[rand_index]

    preguntasQuiz[giftImgStr] = preguntasQuiz[giftImgStr] ?? 0 
    preguntasQuiz[giftImgStr] ++ 
    gift.src = `src/img/objetos/${gift_img[rand_index]}.png`;
  
    cantClicks--;
    localStorage.setItem("preguntasQuiz", JSON.stringify(preguntasQuiz));
}); 

