import page from "https://cdn.skypack.dev/page";
import AppManger from "./managers/AppManager.js";
import infoPage from "./pages/infoPage.js";
import introPage from "./pages/introPage.js";
import menuPage from "./pages/menuPage.js";
import quizPage from "./pages/quizPage.js";
import scorePage from "./pages/scorePage.js";
import { preloadImages } from "./utils/default.js";

preloadImages();

const container = document.getElementById("root")
const App = new AppManger(container);

App.router = page;

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

const i = document.createElement('i')
i.className="root-btn fi fi-rr-menu-dots-vertical" 
document.body.appendChild(i)

document.onload = App._createApp(AppContent);

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    App.router("/menu");
  }
});

i.addEventListener('click', ()=>{
  App.router('/menu')
})


export default App;
