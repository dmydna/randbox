import { hoverClassToggle } from './../Componentes/navbar.js';
import Navbar  from './../Componentes/Nav.js'
import App from "./AppMain.js";
import renderBar from './render/renderBar.js';
import renderNav from './render/renderNav.js';
import MemoryManger from '../Games/Memory.js';
import memory from '../Games/Memory.js';





function createScoreBoardElem(pregunta, respuesta){
  const url = `src/assets/img/objects/${pregunta}.png`
  return (
    ` <div class="gift-container">
       <img class="gift" src="${url}">
       <h2 class="cantAp">${respuesta}</h2>
     </div> `
  )
}

function createScoreBoard(scoreBoard, Quiz){
  for (const pregunta in Quiz) {
      const respuesta = Quiz[pregunta];
      const scoreBoardElem = createScoreBoardElem(pregunta, respuesta);
      scoreBoard.innerHTML += scoreBoardElem 
  }
}

function createNavfooter(navbar){
  navbar._addEvent_Middle( () => { 
    App.router('/menu')
  })
  navbar._addEvent_Left( () => { 
    App.router('/quiz')
  })
  navbar._addEvent_Right( () => { 
    App.router('/info')
  })
}


function scorePage(){
  document.body.className = ""
  document.documentElement.className = ""
  document.documentElement.classList.add('score');  

  const template = document.createElement("template");

  template.innerHTML = `
     <div class="container">
     <div class="header">
        <img height="70px" src="src/assets/img/ui/high-score.png">
        <h1 class="score">${memory._getMemory('score')}</h1>
      </div>
      <div id="game-container">
        <div class="randbox"></div>
      </div>
      <div class="nav-footer"></div>
      </div>
  `
  const container = template.content.cloneNode(true);
  
  const gameContainer = container.querySelector('.randbox') 
  const navContainer = container.querySelector('.nav-footer') 

  navContainer.appendChild(renderNav())

  const nav = new Navbar(navContainer)
  nav._addIcons(['fi-rr-angle-left','fi-rr-home','fi-rr-info'])
  
  const partida = memory._getMemory("partida")
    

  createNavfooter(nav)
  createScoreBoard(gameContainer, partida)

  return container
}



//localStorage.clear();


export default scorePage




