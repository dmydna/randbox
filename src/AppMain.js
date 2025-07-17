import page from 'https://cdn.skypack.dev/page';
import AppManger from "./managers/AppManager.js";
import indexPage from './pages/indexPage.js';
import infoPage from './pages/infoPage.js';
import menuPage from "./pages/menuPage.js";
import quizPage from './pages/quizPage.js';
import scorePage from './pages/scorePage.js';



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