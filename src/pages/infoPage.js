
import App from "./AppMain.js"
import Nav from "./render/renderNav.js"
import Navbar from "../Componentes/Nav.js";




function infoPage(App){

   document.body.className = ""

   const template = document.createElement("template");

   template.innerHTML = `
   <div class="container">
       <div class="header"></div>
       <div id="game-container">
            <div class="randbox">
                <img class="box bounce-in-top" src="/src/assets/img/ui/open-box.png">
                <div class="info-container">
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

   const GIT = "https://github.com/dmydna/randbox"

   const nav = new Navbar(navContainer)

   nav._createNav([
        {id: 1, ico : 'fi-rr-angle-left', handler: () => App.router('/score')},
        {id: 2, ico : 'fi-rr-home',       handler: () => App.router('/menu')},
        {id: 3, ico : 'fi-rr-info',       handler: () => window.open( GIT ,'_blank') }
    ])

   document.body.onload = document.body.classList.add("onload")

   box.addEventListener('animationend', ()=>{ document.body.classList.remove("onload") })


   return container
}

export default infoPage