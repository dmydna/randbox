
import App from "./AppMain.js"
import Nav from "./render/renderNav.js"
import Navbar from "../Componentes/Nav.js";




function infoPage(App){

    document.body.className = ""
    document.documentElement.className = ""
    document.documentElement.classList.add('info');  

   const template = document.createElement("template");

   template.innerHTML = `
   <div class="container">
       <div class="header"></div>
       <div id="game-container">
            <div class="randbox">
                <img class="box bounce-in-top" src="./src/img/ui/open-box.png">
                <div class="info">
                    <h1 class="title">randbox</h1>
                    <div class="descrip">
                       Un juego simple de preguntas y respuestas que explora la frecuencia de aparición.
                    </div>
                    <div class="social">
                        <i class="fi fi-brands-github"></i>
                    </div>
                </div>
            </div>
        </div>
       <div class="nav-footer"></div>
   </div>
   `
   const container = template.content.cloneNode(true);

   const headerContainer = container.querySelector('.header') 
   const gameContainer = container.querySelector('.game-container') 
   const popupContainer = container.querySelector('.popup-container')
   const navContainer = container.querySelector('.nav-footer')

   navContainer.appendChild(Nav()) 

   const box = container.querySelector(".bounce-in-top");
   const randbox = container.querySelector(".randbox");
   const homeBtn = container.querySelector('.midBtn')
   const backBtn = container.querySelector('.ltBtn')
   const socialBtn =container.querySelector(".social")



   document.body.onload = document.body.classList.add("onload")

   box.addEventListener('animationend', ()=>{ document.body.classList.remove("onload") })

   homeBtn.addEventListener('click', () => { App.fastRender('menu') } )
   backBtn.addEventListener('click', () => { App.fastRender('score') } )

   socialBtn.addEventListener('click', ()=>{  window.open( "https://github.com/dmydna/randbox", '_blank')  })



   return container
}

export default infoPage