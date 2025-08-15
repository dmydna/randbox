
import memory from "../../managers/Memory.js";
import renderBar from "../../componentes/renderBar.js";
import renderPopup from '../../componentes/renderPopup.js';
import renderQuiz from '../../componentes/renderQuiz.js';
import QuizGameUI from './GameUI.js'
import PopupClass from "./Popup.js";
import ShuffleImgs from "./ShuffleImgs.js";
import { hoverClassToggle } from "../../utils/utils.js";

const QuizGameApp = async (App, container) => {

    const gameContainer  = container.querySelector('.game-container') 
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

    const QuizGame =   new QuizGameUI({...partida.quiz}, config.vidas, gameContainer)

    QuizGame.createApp({
        _animations: new ShuffleImgs(),
        _controls: App.navbar,
        _popup: new PopupClass(popupContainer),
        _progress: App.headerElem.querySelector('.progress-bar')
    })



    // Comienza Quiz
    container.onload = QuizGame._init()

    // Carga config
    if(config.teclado == 1){
        QuizGame.teclado = true
    }
    if(config.memoria == 1){
        QuizGame.resumen = true;
        QuizGame.reanudarPartida(partida)
        memory.set( 'menu', { ...memory.get('menu'), resume_to: 'quiz' } )
    }

    // Animaciones
    const box     = container.querySelector('.box')
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

    await QuizGame.jugar() // espera que termine partida

    memory.set("token", "score-loaded");
    memory.set("menu",{resume_to: null, pause:0})
    App.setPreRender(()=>{document.body.classList.add('onload')})
    App.forward();
}

export default QuizGameApp