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
    if(cantClicks <= -1){
        gift.style.opacity =  "0"
    }else{
        gift.style.opacity =  "1"
    }

} )


box.addEventListener('animationend', ()=>{



    if(cantClicks == 0){

        document.querySelector(".progress").style.opacity = "0";
        box.style.animationDuration = '0.5s'
        box.style.animationName = 'scale-out-center'
        cantClicks --
    }
    if( cantClicks <= 0){
        box.style.opacity = "0"
        document.querySelector(".progress").style.opacity = "0";
        setTimeout( ()=>{window.location.href = "../quiz.html"}, 500 ) 
    }

});




box.addEventListener('click', (e) => {

    e.stopPropagation()

    gift.style.opacity = gift.style.opacity == '1' ? '0' : '1'

    const barraCarga = document.querySelector('.progress')
    const carga = document.querySelector(".progress-bar")

    box.style.animationName =  box.style.animationName == 'lanzar-box-1' ? 'lanzar-box-2' : 'lanzar-box-1'
    box.classList.remove("onload"); 


    barraCarga.style.opacity =  ".5"
    carga.style.width =`${((limitClicks - cantClicks + 1) / limitClicks) * 100}%`

    let rand_index =  Math.floor(Math.random() * gift_img.length);
    let giftImgStr = gift_img[rand_index]

    preguntasQuiz[giftImgStr] = preguntasQuiz[giftImgStr] ?? 0 
    preguntasQuiz[giftImgStr] ++ 
    gift.src = `src/img/objetos/${gift_img[rand_index]}.png`;
  
    cantClicks--;

    if(cantClicks <= -1){
        gift.style.opacity =  "0"
    }

    localStorage.setItem("preguntasQuiz", JSON.stringify(preguntasQuiz));
}); 




document.addEventListener('keydown', function(event) {
    if (event.key === 'p') {
      document.body.style.pointerEvents="none"
      const auto = setInterval( ()=>{
        box.click(); 
        cantClicks--
        if(cantClicks == 0){
            clearInterval(auto)
        }
    }, 1000)
    }
  });


  document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
      document.body.style.pointerEvents="none"
      box.click()
    }
  });