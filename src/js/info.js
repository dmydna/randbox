
const randbox = document.querySelector(".randbox");
const homeBtn = document.querySelector('.resetBtn')
const backBtn = document.querySelector('.plusBtn')
const ui = document.querySelector(".ui")
const score_container = document.querySelector(".score")
const socialBtn = document.querySelector(".social")

homeBtn.addEventListener('click', () => { window.location.href = "../index.html" } )
backBtn.addEventListener('click', () => { window.location.href = "../quiz.html" } )

socialBtn.addEventListener('click', ()=>{  window.open( "https://github.com/dmydna/randbox", '_blank')  })

