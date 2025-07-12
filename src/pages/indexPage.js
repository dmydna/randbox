

import IntroGameApp from '../Games/IntroGame/App.js'
import {gift_img} from '../main.js'
import renderBar from './render/renderBar.js';
import renderQuiz from './render/renderQuiz.js';


const config = JSON.parse(localStorage.getItem("GameConfig")) || {}



function indexPage(App){

    document.body.className = ""

    // cargarEstilos(false, true)

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

    const userResp = container.querySelector('.user-reply')
    const img = document.createElement('img')
    img.className = 'gift'
    userResp.replaceWith(img)

    const boxContainer = container.querySelector('.box-container')
    boxContainer.classList.add('center-fix')

    const Game = new IntroGameApp(gift_img, config.vidas, gameContainer)
    Game.barra = progressContainer.querySelector('.progress-bar')

    Game.jugar()

    return container
}


export default indexPage




