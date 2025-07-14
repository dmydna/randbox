import { hoverClassToggle, hoverFlatIcon, navbar } from "../Componentes/navbar.js";
import QuizApp from "../Games/quizGame/App.js";
// import { } from "../Componentes/test.js";
import { quizKeyboardEnable } from "../Componentes/keyboard.js";


// Renders
import renderBar from './render/renderBar.js';
import renderNav from './render/renderNav.js';
import renderPopup from './render/renderPopup.js';
import renderQuiz from './render/renderQuiz.js';

// Clases
import ShuffleImgs from "../Games/quizGame/ShuffleImgs.js";
import PopupClass from "../Games/quizGame/Popup.js";
import Navbar from "../Componentes/Nav.js";
import memory from "../Games/Memory.js";

// Inicializa Estructuras
// const box = document.querySelector(".box")



// animaciones
// hoverFlatIcon(navbar.middle,'ss')
// hoverClassToggle(box,'vibrate-3')


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

    const QuizContent = {}
    QuizContent['_animations'] = new ShuffleImgs()
    QuizContent['_controls']   = new Navbar(navContainer)
    QuizContent['_popup']      = new PopupClass(popupContainer)
    QuizContent['_progress']   = headerContainer.querySelector('.progress-bar')

    const QuizGame =   new QuizApp(preguntasQuiz, config.vidas, gameContainer)

    QuizGame.createApp(QuizContent)
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
    hoverClassToggle(container,'vibrate-3')


    return container
}





export default quizPage

