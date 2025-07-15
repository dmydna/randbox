import IntroGameApp from '../Games/IntroGame/App.js'
import renderBar from './render/renderBar.js';
import renderQuiz from './render/renderQuiz.js';
import { juegoDefault } from '../main.js';
import memoria from '../Games/Memory.js';
import { _updCssVars } from '../Menu/sections/utils.js';


function indexPage(App){
    document.body.className = ""
    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div class="header"></div>
        <div class="game-container"></div>
        <div class="progress-container"></div>
        <div class="nav-footer"></div>
    </div>
    `
    const container = template.content.cloneNode(true); 
    const gameContainer = container.querySelector('.game-container') 
    const progressContainer = container.querySelector('.progress-container')

    const ProgressBar = renderBar()
    const Quiz = renderQuiz()

    progressContainer.appendChild(ProgressBar)
    gameContainer.appendChild(Quiz)

    // Animacion Inicial
    const box = container.querySelector('.box')

    document.body.classList.add("onload")
    box.addEventListener('animationend', ()=>{
        document.body.classList.remove('onload')
    },{once:true})
    

    const userResp = container.querySelector('.user-reply')
    const img = document.createElement('img')
    img.className = 'gift'
    userResp.replaceWith(img)

    const boxContainer = container.querySelector('.box-container')
    boxContainer.classList.add('center-fix')

 
    const partida = memoria._getMemory("partida")
    const config = memoria._getMemory("opciones")

    _updCssVars()


    const Game = new IntroGameApp(Object.keys(partida), config.vidas, gameContainer)
    Game.barra = progressContainer.querySelector('.progress-bar')

    Game.jugar()

    return container
}


export default indexPage




