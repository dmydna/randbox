import renderBar from '../componentes/renderBar.js';
import renderQuiz from '../componentes/renderQuiz.js';
import IntroGameApp from '../games/IntroGame/App.js';
import { default as memoria, default as memory } from '../managers/Memory.js';


function introPage(App){

    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div id="game-container"></div>
        <div class="progress-container"></div>
    </div>
    `
    const container = template.content.cloneNode(true); 
    const gameContainer = container.querySelector('#game-container') 
    const progressContainer = container.querySelector('.progress-container')

    const ProgressBar = renderBar()
    const Quiz = renderQuiz()

    progressContainer.appendChild(ProgressBar)
    gameContainer.appendChild(Quiz)



    const userResp = container.querySelector('.respUser-clicker')
    const img = document.createElement('img')
    img.className = 'gift'
    userResp.replaceWith(img)

    const boxContainer = container.querySelector('.box-container')
    boxContainer.classList.add('center-fix')

 
    const partida = memoria.get("partida_quiz")
    const config = memoria.get("opciones")
    const partida_intro = memory.get("partida_intro")


    const IntroGame = new IntroGameApp(partida.quiz, config.intentos, gameContainer)
    IntroGame.progreso = progressContainer.querySelector('.progress-bar')
    // Carga config teclado
    if(config.teclado == 1){
    	IntroGame.teclado = true
    }

    if(config.memoria == 1){
        IntroGame.resumen = true;
        IntroGame.reanudarPartida(partida_intro)
        memory.set('resume', 'intro')
    }


    // Animacion Inicial
    IntroGame.animarInicio()
    IntroGame.jugar()

    return container
}


export default introPage




