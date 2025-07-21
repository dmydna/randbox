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

  return scoreBoard
}

function scoreItemAnim(elems){

  const scoreItems = Array.from(elems).filter((elem => elem.tagName === 'DIV'))
  let i = 0;
  const intervalo = setInterval(() => {
    if (i >= scoreItems.length) {
      clearInterval(intervalo);
      return;
    }
    scoreItems[i].style.opacity = '1'
    i++;
  }, 600); 
}

function scoreBarAnim(scoreContainer){
  const score_points = memory.get('partida').score
  let i = 0;
  let intervalo = setInterval(() => {
    scoreContainer.innerHTML = i;
    i+=100;
    if (i >= score_points) {
      clearInterval(intervalo);
      scoreContainer.innerHTML = i-100;
    }
  }, 0);
}




function scorePage(App){

  const token = memory.get('token')
  if( token == 'init' || token == 'quiz-loaded'){
    App.router('/main')
    return
  }

  document.body.className = ""
  document.documentElement.className = ""
  document.documentElement.classList.add('score');  

  const template = document.createElement("template");

  template.innerHTML = `
     <div class="container">
      <div class="header">
        <img height="70px" src="src/assets/img/ui/high-score.png">
        <h1 class="score-bar">
          <img height="35px" src="src/assets/img/ui/coin.png"></i>
          <p class="score-item"></p>
        </h1>
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
  const scoreContainer = container.querySelector('.score-item')

  // Visualiza score con delay
  scoreBarAnim(scoreContainer)

  navContainer.appendChild(renderNav())

  const nav = new Navbar(navContainer)
    
  nav._createNav([
    {id: 1, ico : 'fi-rr-angle-left', handler: ()=> App.router('/quiz')},
    {id: 2, ico : 'fi-rr-home',       handler: ()=> App.router('/menu')},
    {id: 3, ico : 'fi-rr-info',       handler: ()=> App.router('/info')}
  ])

  const partida = memory.get("partida").quiz
    
  const scoreBoardElem = createScoreBoard(gameContainer, partida)

  // Visualiza score items con delay
  scoreItemAnim(scoreBoardElem.childNodes)
  
  return container
}



export default scorePage




