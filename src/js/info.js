const box = document.querySelector(".bounce-in-top");
const randbox = document.querySelector(".randbox");
const homeBtn = document.querySelector('.midBtn')
const backBtn = document.querySelector('.ltBtn')
const ui = document.querySelector(".nav-footer")
const score_container = document.querySelector(".score")
const socialBtn = document.querySelector(".social")
const container_game = document.getElementById("game-container")



box.addEventListener('animationend', ()=>{ container_game.style.overflow = "overlay" })

homeBtn.addEventListener('click', () => { window.location.href = "../index.html" } )
backBtn.addEventListener('click', () => { window.location.href = "../score.html" } )

socialBtn.addEventListener('click', ()=>{  window.open( "https://github.com/dmydna/randbox", '_blank')  })
