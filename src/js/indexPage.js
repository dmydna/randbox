import { aplicarConfiguracionDelJuego } from "./Modules/popupMenu.js";




document.addEventListener("keydown", function (event) {
  if (event.key == "p") {
    document.body.style.pointerEvents = "none";
    const intervalo = setInterval(() => {
      document.querySelector(".box").click();
      if (minijuego.intentosRestantes == 0) {
        clearInterval(intervalo);
      }
    }, 1000);
  }
  if (event.key == "k"){
    console.log(minijuego.progreso())
  }
});

document.addEventListener("keydown", function (event) {
  const box = document.querySelector(".box");
  if (event.key == " ") {
    box.click();
  }
});



// const minijuego = new MiniJuego(gift_img, limitClicks);
document.onload = document.body.classList.add("onload");
// document.onload = minijuego.jugar();


document.querySelector('.box').addEventListener('animationend', ()=>{
  aplicarConfiguracionDelJuego()
  document.body.classList.remove('onload')

},{once:true})

console.log("hola soy un script desde src")





