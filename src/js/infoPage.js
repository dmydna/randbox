import { hoverClassToggle } from "./Modules/navbar.js";

const box = document.querySelector(".bounce-in-top");
const randbox = document.querySelector(".randbox");
const homeBtn = document.querySelector('.midBtn')
const backBtn = document.querySelector('.ltBtn')
const socialBtn = document.querySelector(".social")
const container_game = document.querySelector("#game-container")


document.body.onload = document.body.classList.add("onload")

box.addEventListener('animationend', ()=>{ document.body.classList.remove("onload") })

homeBtn.addEventListener('click', () => { window.location.href = "../index.html" } )
backBtn.addEventListener('click', () => { window.location.href = "../score.html" } )

socialBtn.addEventListener('click', ()=>{  window.open( "https://github.com/dmydna/randbox", '_blank')  })

hoverClassToggle(homeBtn , 'fi-sr-home')