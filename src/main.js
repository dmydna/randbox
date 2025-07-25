import page from "https://cdn.skypack.dev/page";
import renderNav from "./componentes/renderNav.js";
import AppManger from "./managers/AppManager.js";
import Navbar from "./managers/Nav.js";
import infoPage from "./pages/infoPage.js";
import introPage from "./pages/introPage.js";
import menuPage from "./pages/menuPage.js";
import quizPage from "./pages/quizPage.js";
import scorePage from "./pages/scorePage.js";
import { preloadImages } from "./utils/default.js";

preloadImages();

const container = document.getElementById("root")
const App = new AppManger(container);

console.log(container)

App.router = page;
App.content = container.querySelector('.app-content')

const AppContent = [
  { id: "menu", render: menuPage },
  { id: "tutorial", render: (app) => menuPage(app, "tutorial") },
  { id: "options", render: (app) => menuPage(app, "options") },
  { id: "controls", render: (app) => menuPage(app, "controls") },
  { id: "intro", render: introPage },
  { id: "quiz", render: quizPage },
  { id: "score", render: scorePage },
  { id: "info", render: infoPage },
];

const headerContainer = container.querySelector('.header')
const navContainer = container.querySelector('.nav-footer')

navContainer.appendChild(renderNav())

App.navbar =  new Navbar(navContainer)
App.headerElem =  headerContainer


const i = document.createElement('i')
i.className="root-btn fi fi-rr-menu-dots-vertical" 
container.appendChild(i)

App.setPreRender(()=>{
  //Animacion de inicio
  document.body.classList.add('onload')
})

App._createApp(AppContent);
App._init()

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    App.router("/menu");
  }
});

i.addEventListener('click', ()=>{
  App.router('/menu')
})


export default App;
