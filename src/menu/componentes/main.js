import App from "../../App.js";
import memory from "../../managers/Memory.js";
import { hoverFlatIcon, shuffleArr } from "../../utils/utils.js";
import popup_menu from "/src/assets/img/popup/menu-game.png";

function menuMain(menu) {

  // Agrega Menu Items
  const menuItems = [
    { id: "play-btn",     title: "PLAY",     ico: "fi fi-rr-play" },
    { id: "score-btn",    title: "SCORE",    ico: "fi fi-rr-trophy-star" },
    { id: "continue-btn", title: "CONTINUE", ico: "fi fi-rr-dice-d10" },
    { id: "options-btn",  title: "OPTIONS",  ico: "fi fi-rr-settings" },
    { id: "help-btn",     title: "HELP",     ico: "fi fi-rr-info" },
  ];

  const container = document.createElement("section");
  container.classList.add("main-menu");
  const img = document.createElement("img");

  img.src = popup_menu;
  img.className = "popup-ico";
  img.height = "100px";

  container.appendChild(img);
  const ul = document.createElement("ul");
  ul.classList.add("menu");

  // Agrega Handlers
  menuItems.forEach((prop) => {
    const li = createMainItem(prop);
    li.addEventListener("click", (e) => {
      switch (prop.id) {
        case "play-btn":
          _playMenuHandler(menu);
          break;
        case "score-btn":
          _verScoreHandler();
          break;
        case "continue-btn":
          _resumeHandler();
          break;
        case "options-btn":
          menu.changeMenu("options");
          break;
        case "help-btn":
          menu.changeMenu("help");
          break;
      }
    });
    ul.appendChild(li);
  });
  container.appendChild(ul);

  return container;
}

// Handlers

function _resumeHandler() {
  App.resume(memory.get("resume_to"))
}

function _verScoreHandler() {
  App.router("/score");
}

function _playMenuHandler(menu) {
  // Inicia nueva partida con preguntas aleatorias
  menu.showMenu(false);
  document.querySelector(".box").style.opacity = "1";

  // Limpia datos de partida anterior (setea a valor por default)
  memory.reset("partida_quiz");
  memory.reset("partida_intro");
  memory.set("token", "init");


  // window.dispatchEvent();
  
  App.setPreRender( ()=>{
     document.body.classList.add('onload')
  })

  // Genera Partida aleatoria basada en dificultad
  const opciones = memory.get("opciones");
  const partida = memory.get("partida_quiz");

  const preguntas = Array.from(memory.get("preguntas"));
  const quiz = Object.fromEntries(
    shuffleArr(preguntas)
      .slice(0, opciones.dificultad)
      .map((element) => [element, 0])
  );

  memory.set("partida_quiz", {
    ...partida,
    quiz: quiz,
  });

  // memory.refresh()
  if(opciones.tutorial==1){
    setTimeout(() => {
      App.router("/tutorial")
      const html = document.documentElement;
      html.classList.add('tutorial-from-intro')
    }, 2000);
  }




  App.router("/intro");
}

// Auxiliares

function createMainItem(prop) {
  const li = document.createElement("li");
  li.className = prop.id;

  const i = document.createElement("i");
  i.className = prop.ico;

  const span = document.createElement("span");
  span.textContent = prop.title;

  li.appendChild(i);
  li.appendChild(span);

  hoverFlatIcon(li);

  return li;
}

export default menuMain;
