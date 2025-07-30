// import page from "https://cdn.skypack.dev/page";

import page from 'page';
import renderNav from "./componentes/renderNav.js";
import AppManger from "./managers/AppManager.js";
import memory from "./managers/Memory.js";
import Navbar from "./managers/Nav.js";
import aboutPage from "./pages/aboutPage.js";
import introPage from "./pages/introPage.js";
import menuPage from "./pages/menuPage.js";
import quizPage from "./pages/quizPage.js";
import scorePage from "./pages/scorePage.js";
import { preloadImages } from "./utils/default.js";


const App = function(){


  preloadImages();

  window.addEventListener('beforeunload', () => {
    localStorage.setItem(memory.storage, JSON.stringify(memory._Data))
  });

  // memory.refresh()
  memory.check()
  
  const template = document.createElement("template");
  
  template.innerHTML = `
  <div class="App">
    <header class="header"></header>
    <main class="app-content"></main>
    <footer class="nav-footer"></footer>
  </div>
  `
  const container = template.content.cloneNode(true);
  const App = new AppManger(container);
  
  App.router = page;
  const contentContainer = container.querySelector('main')
  const headerContainer = container.querySelector('header')
  const navContainer = container.querySelector('footer')

  const AppContent = [
    { id: "menu", render: menuPage },
    { id: "tutorial", render: (app) => menuPage(app, "tutorial") },
    { id: "options",  render: (app) => menuPage(app, "options") },
    { id: "controls", render: (app) => menuPage(app, "controls") },
    { id: "intro", render: introPage },
    { id: "quiz",  render: quizPage   },
    { id: "score", render: scorePage },
    { id: "about",  render: aboutPage   },
  ];
  

  
  navContainer.appendChild(renderNav())
  App.content    =   contentContainer
  App.navbar     =   new Navbar(navContainer)
  App.headerElem =   headerContainer
  
  
  const i = document.createElement('i')
  i.className="fi fi-rr-menu-dots-vertical" 
  i.id = "menuDots"

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

  

  return App
}


export default App();
