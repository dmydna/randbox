import AppManger from "./AppManager.js";
import scorePage from './scorePage.js';
import quizPage  from './quizPage.js';
import menuPage from "./menuPage.js";
import indexPage from './indexPage.js';
import infoPage from './infoPage.js'
import page from 'https://cdn.skypack.dev/page';



const App = new AppManger(document.body)

App.router = page

const AppContent = [
    {id : "menu",  render : menuPage },
    {id : "intro", render : indexPage},
    {id : "quiz" , render : quizPage },
    {id : "score", render : scorePage},
    {id : "info",  render :  infoPage}
]


App._createApp(AppContent)


document.addEventListener("keydown", function (event) {
    if (event.key == 'm') {
        App.router('/menu')
    }
});






export default App