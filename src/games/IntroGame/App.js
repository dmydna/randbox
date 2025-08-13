import renderBar from '../../componentes/renderBar.js';
import renderQuiz from '../../componentes/renderQuiz.js';
import IntroGameUI from './GameUI.js';
import memory from '../../managers/Memory.js';

const IntroGameApp = async (App, container) => {

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

 
    const partida = memory.get("partida_quiz")
    const opciones = memory.get("opciones")
    const partida_intro = memory.get("partida_intro")


    const IntroGame = new IntroGameUI(partida.quiz, opciones.intentos, gameContainer)
    IntroGame.progreso = progressContainer.querySelector('.progress-bar')
    // Carga config teclado
    if(opciones.teclado == 1){
    	IntroGame.teclado = true
    }

    if(opciones.memoria == 1){
        IntroGame.resumen = true;
        IntroGame.reanudarPartida(partida_intro)
        memory.set( 'menu', { ...memory.get('menu'), resume_to: 'intro' } )
    }


    await IntroGame.jugar() // espera que termine partida

    memory.set("token", "quiz-loaded");
    App.setPreRender(()=>{document.body.classList.add('onload')})
    App.forward();

}

export default IntroGameApp