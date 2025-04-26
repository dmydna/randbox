import { btn_ui, gift_img } from './config.js';


const randbox = document.querySelector(".randbox");
const resetBtn = document.createElement('img')
const ui = document.querySelector(".ui")
let cantRepetciones = JSON.parse(localStorage.getItem("cantRepeticiones"));



resetBtn.src = `/ui/${btn_ui[0]}.png`;
resetBtn.width = 50;
ui.appendChild(resetBtn);
resetBtn.addEventListener('click', () => { window.location.href = "../index.html" } )

gift_img.map((src, index) =>{
  const nuevaImg = document.createElement('img');
  const imgContainer = document.createElement('div');
  const cantAp = document.createElement("h2");

  nuevaImg.classList.add("gift")
  cantAp.classList.add("cantAp")
  imgContainer.classList.add("imgContainer")

  cantAp.innerHTML = cantRepetciones[index];
  nuevaImg.src = `/imgs/${src}.png`;
  
  imgContainer.appendChild(nuevaImg);
  imgContainer.appendChild(cantAp);

  randbox.appendChild(imgContainer);

  //localStorage.clear();
})