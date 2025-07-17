import QuizApp from "../games/quizGame/App.js";
// import { } from "../Componentes/test.js";
import { quizKeyboardEnable } from "../utils/keyboard.js";


// Renders
import renderBar from '../componentes/renderBar.js';
import renderNav from '../componentes/renderNav.js';
import renderPopup from '../componentes/renderPopup.js';
import renderQuiz from '../componentes/renderQuiz.js';

// Clases
import Navbar from "../managers/Nav.js";
import memory from "../managers/Memory.js";
import PopupClass from "../games/quizGame/Popup.js";
import ShuffleImgs from "../games/quizGame/ShuffleImgs.js";



function quizPage(App){

     document.body.className = ""

    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div class="header"></div>
        <div class="game-container"></div>
        <div class="popup-container"></div>
        <div class="nav-footer"></div>
    </div>
    `
    const container = template.content.cloneNode(true);

    const headerContainer = container.querySelector('.header') 
    const gameContainer = container.querySelector('.game-container') 
    const popupContainer = container.querySelector('.popup-container')
    const navContainer = container.querySelector('.nav-footer')

    const Header = renderBar()
    const Quiz = renderQuiz()
    const Nav = renderNav()
    const Popup = renderPopup()


    gameContainer.style.width = '100%'
    headerContainer.appendChild(Header)
    gameContainer.appendChild(Quiz)
    popupContainer.appendChild(Popup)

    navContainer.appendChild(Nav)



    const config =   memory._getMemory("opciones")
    const memoria =  memory._getMemory("memoria")
    const preguntasQuiz = memory._getMemory("partida")

    // Incializo Quiz


    const QuizGame =   new QuizApp(preguntasQuiz, config.vidas, gameContainer)

    QuizGame.createApp({
        _animations: new ShuffleImgs(),
        _controls: new Navbar(navContainer),
        _popup: new PopupClass(popupContainer),
        _progress: headerContainer.querySelector('.progress-bar')
    })

    // Comienza Quiz
    container.onload = QuizGame._init()
    QuizGame.iniciarJuego()
    QuizGame._animarInicio()

    // Carga config teclado
    if(config.teclado == 1){
    	quizKeyboardEnable(true)
    }
    if(config.memoria == 1){
        QuizGame.resumen = true;
        QuizGame.reanudarPartida(memoria)
    }

    // Animaciones
    const box = container.querySelector('.box')
    box.classList.add('shake-little')
    const repUser = container.querySelector('.user-reply')
    repUser.classList.add('shake-little')


    return container
}





export default quizPage

