const body = document.querySelector("body");
const randbox = document.querySelector(".randbox");
const box = document.querySelector(".box");
const gift = document.querySelector(".gift");
const ui = document.querySelector(".ui")

let cantRepetciones = JSON.parse(localStorage.getItem("cantRepeticiones"));

imgsHell = [
  "https://i.ibb.co/99wS9TFX/randbox.png",
  "https://i.ibb.co/cXcpC9mh/apple.png",
  "https://i.ibb.co/1f6QPcym/cheese.png",
  "https://i.ibb.co/8D5HhYFp/hamburger.png",
  "https://i.ibb.co/PsxZWmJj/rocket.png",
  "https://i.ibb.co/jPGm2323/coin.png",
  "https://i.ibb.co/Kj7YwTZW/box.png"
]

imgsHell.map((src, index) =>{
  const nuevaImg = document.createElement('img');
  const imgContainer = document.createElement('div');
  const cantAp = document.createElement("h2");

  nuevaImg.classList.add("gift")
  cantAp.classList.add("cantAp")
  imgContainer.classList.add("imgContainer")

  cantAp.innerHTML = cantRepetciones[index];
  nuevaImg.src = src;
  
  imgContainer.appendChild(nuevaImg);
  imgContainer.appendChild(cantAp);

  randbox.appendChild(imgContainer);
})