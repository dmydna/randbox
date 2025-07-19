import renderNav from '../componentes/renderNav.js';
import App from "../main.js";
import memory from '../managers/Memory.js';
import Navbar from '../managers/Nav.js';





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


function scorePage(){
  document.body.className = ""
  document.documentElement.className = ""
  document.documentElement.classList.add('score');  

  const template = document.createElement("template");

  template.innerHTML = `
     <div class="container">
     <div class="header">
        <img height="70px" src="src/assets/img/ui/high-score.png">
        <h1 class="score">${memory.get('partida').score}</h1>
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
    
  nav._createNav([
    {id: 1, ico : 'fi-rr-angle-left', handler: ()=> App.router('/quiz')},
    {id: 2, ico : 'fi-rr-home',       handler: ()=> App.router('/menu')},
    {id: 3, ico : 'fi-rr-info',       handler: ()=> App.router('/info')}
  ])

  const partida = memory.get("partida").quiz
    
  createScoreBoard(gameContainer, partida)

  return container
}



//localStorage.clear();


export default scorePage




