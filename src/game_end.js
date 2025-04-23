
const body = document.querySelector("body");
const randbox = document.querySelector(".randbox");
const randbox_img = document.querySelector(".randbox_img");
const randbox_msg = document.querySelector(".randbox_msg");
const ui = document.querySelector(".ui")

let clickEvent = 0;

colores = ["blanco","violeta","azul","magenta","naranja","rojo"];


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
    const imgContainer = document.createElement('div');
    const cantAp = document.createElement("h2");

    nuevaImg.classList.add("randbox_img")
    cantAp.classList.add("cantAp")
    imgContainer.classList.add("imgContainer")

    cantAp.innerHTML = "0";
    nuevaImg.src = src;
    
    imgContainer.appendChild(nuevaImg);
    imgContainer.appendChild(cantAp);

    randbox.appendChild(imgContainer);

})



let ultimaImgen = "";

randbox_img.addEventListener('click', () => {

    // checkeo que las imgs sean distintas
    let imgActual = randomLista(imgsHell);
    while(imgActual == ultimaImgen ){
        imgActual = randomLista(imgsHell);
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
}); 
