import memory from "../managers/Memory.js";
import runQuiz from '../games/quizGame/App.js';
import QuizGameApp from "../games/quizGame/App.js";

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
    
    QuizGameApp(App, container)


    return container
}



export default quizPage

