import scoreHeader from '../componentes/scoreHeader.js';
import memory from '../managers/Memory.js';





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
    App.router('/menu')
    return
  }

  document.documentElement.classList.add('score');  

  const template = document.createElement("template");

  template.innerHTML = `
     <div class="container">
       <div id="game-container">
         <div class="randbox"></div>
       </div>
     </div>
  `
  const container = template.content.cloneNode(true);
  App.headerElem.appendChild(
    scoreHeader()
  )  
  const gameContainer = container.querySelector('.randbox') 
  const scoreContainer = App.headerElem.querySelector('.score-item')

  // Visualiza score con delay
  scoreBarAnim(scoreContainer)



  App.navbar._updateNav([
    {id: 1, ico : 'fi-rr-angle-left', handler: ()=> App.router('/quiz')},
    {id: 2, ico : 'fi-rr-home',       handler: ()=> App.router('/menu')},
    {id: 3, ico : 'fi-rr-info',       handler: ()=> App.router('/info')}
  ])

  const partida = memory.get("partida").quiz
    
  const scoreBoardElem = createScoreBoard(gameContainer, partida)

  // Visualiza score items con delay
  if(document.body.classList.contains('onload')){
    document.body.classList.remove('onload')
    scoreItemAnim(scoreBoardElem.childNodes)
  }else{
    const giftContainer = container.querySelectorAll('.gift-container')
    giftContainer.forEach(element => {
      element.style.opacity = '1'
    }); 
  }

  
  return container
}



export default scorePage




