
import Nav from "../componentes/renderNav.js";
import memory from "../managers/Memory.js";
import Navbar from "../managers/Nav.js";

import { hoverClassToggle } from "../utils/utils.js";


function infoPage(App){

   document.body.className = ""

   const template = document.createElement("template");

   template.innerHTML = `
   <div class="header"></div>
   <div class="container">
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
   </div>
   <div class="nav-footer"></div>
   `
   const container = template.content.cloneNode(true);
   const navContainer = container.querySelector('.nav-footer')
   navContainer.appendChild(Nav()) 
   const box = container.querySelector(".bounce-in-top");


   const GIT = "https://github.com/dmydna/randbox"

   const nav = new Navbar(navContainer)

   nav._createNav([
        {id: 1, ico : 'fi-rr-angle-left', handler: () => App.router('/score')},
        {id: 2, ico : 'fi-rr-home',       handler: () => App.router('/menu')},
        {id: 3, ico : 'fi-rr-info',       handler: () => window.open( GIT ,'_blank') }
    ])

   document.body.onload = document.body.classList.add("onload")
   box.addEventListener('animationend', ()=>{ 
      document.body.classList.remove("onload")
      box.classList.remove('bounce-in-top')
      hoverClassToggle(box, 'box heartbeat')
   })

   
   box.addEventListener('click', ()=>{
        memory.clear(true)
        box.classList.add('scale-out-center')
        box.addEventListener('animationend', ()=>{
            App.router('/menu')
        })

    } )

   return container
}

export default infoPage