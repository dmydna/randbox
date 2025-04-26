const box = document.querySelector(".box");
const gift = document.querySelector(".gift");
let clickEvent = 0;


imgsHell = ["randbox.png","apple.png","cheese.png","hamburger.png","rocket.png","coin.png","box.png"]

cantRepetciones = [0,0,0,0,0,0,0]

let ultimaImgen = "";
let cantClicks = 5;

box.addEventListener('click', () => {

    box.classList.remove("onload");    

    let random_i =  Math.floor(Math.random() * imgsHell.length);

    cantRepetciones[random_i]++;

    // checkeo que las imgs sean distintas
     let imgActual = imgsHell[random_i];
    while(imgActual == ultimaImgen ){
        imgActual = imgsHell[random_i];
    }
    ultimaImgen = imgActual;
    
    
    gift.src = `src/imgs/${imgActual}`;
    
    
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
        window.location.href = "../quiz.html"
    }

    localStorage.setItem("cantRepeticiones", JSON.stringify(cantRepetciones));
    

    // console.log(cantClicks);
    // console.log(imgActual);
    // console.log(cantRepetciones);
}); 

