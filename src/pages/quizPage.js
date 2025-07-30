import renderBar from '../componentes/renderBar.js';
import renderPopup from '../componentes/renderPopup.js';
import renderQuiz from '../componentes/renderQuiz.js';
import QuizApp from "../games/quizGame/App.js";
import PopupClass from "../games/quizGame/Popup.js";
import ShuffleImgs from "../games/quizGame/ShuffleImgs.js";
import memory from "../managers/Memory.js";
import { hoverClassToggle } from "../utils/utils.js";


function quizPage(App){

    const token = memory.get('token')
    if( token == 'init'){
        App.router('/menu')
        return
    }
    
    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div class="game-container"></div>
        <div class="popup-container"></div>
    </div>
    `
    const container = template.content.cloneNode(true);
    const gameContainer = container.querySelector('.game-container') 
    const popupContainer = container.querySelector('.popup-container')
    const Quiz = renderQuiz()
    const Popup = renderPopup()


    gameContainer.style.width = '100%'
    App.headerElem.appendChild(renderBar())


    gameContainer.appendChild(Quiz)
    popupContainer.appendChild(Popup)
    const config =   memory.get("opciones")
    const partida =  memory.get("partida_quiz")

    // Incializo Quiz

    const QuizGame =   new QuizApp({...partida.quiz}, config.vidas, gameContainer)

    QuizGame.createApp({
        _animations: new ShuffleImgs(),
        _controls: App.navbar,
        _popup: new PopupClass(popupContainer),
        _progress: App.headerElem.querySelector('.progress-bar')
    })

    // Carga config teclado
    if(config.teclado == 1){
    	QuizGame.teclado = true
    }

    // Comienza Quiz
    container.onload = QuizGame._init()
    QuizGame.iniciarJuego()
    QuizGame.animarInicio()

    if(config.memoria == 1){
        QuizGame.resumen = true;
        QuizGame.reanudarPartida(partida)
        memory.set('resume', 'quiz')
    }

    // Animaciones
    const box = container.querySelector('.box')
    const repUser = container.querySelector('.user-reply')

    hoverClassToggle(box, 'box heartbeat')
    hoverClassToggle(repUser, 'user-reply heartbeat')

    // Expande zonas clickeables
    const boxClicker = container.querySelector('.box-clicker')
    const respUserClicker = container.querySelector('.respUser-clicker')

    boxClicker.addEventListener('click' ,(e)=>{
        e.preventDefault()
        box.click()
    })

    respUserClicker.addEventListener('click', (e)=>{
        e.preventDefault()
        repUser.click()
    })


    if(config.tutorial == 1){
        setTimeout(() => {
            App.router("/tutorial")
            const html = document.documentElement;
            html.classList.add('tutorial-from-quiz')
            memory.set('opciones',{
                ...memory.get('opciones'),
                tutorial : 0
            })
          }, 2000);
    }


    return container
}





export default quizPage

