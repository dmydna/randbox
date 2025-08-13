import memory from "../managers/Memory.js";
import Menu from "../menu/Menu.js";

function menuPause(){
  const memory_config = memory.get("opciones");
  const memory_menu = memory.get("menu");
  if(memory.get('token') != 'score-loaded'){
    if(memory_config.menu == 1 && 
     memory_config.memoria == 1  && 
     memory_menu.pause == 1 ){
      document.body.classList.add('menu-pause')
    }else{
      document.body.classList.remove('menu-pause')
    }
  }
}

function menuPage(App, startMenu = null) {


  const template = document.createElement("template");

  template.innerHTML = `
    <div class="container">
        <img class="box" src="/src/assets/img/ui/open-box.png" />
        <div class="popup"></div>
    </div>
    `;

  const container = template.content.cloneNode(true);
  const popupContainer = container.querySelector(".popup");



  Menu.init({
    elem: popupContainer, 
    nav: App.navbar, 
    box: container.querySelector('.box')
  });


  if (startMenu) {
    // Renderiza pagina basada en menu
    // muestra instancia unica de menu
    Menu.showMenu(true);
    Menu.changeMenu(startMenu);
    document.documentElement.id = "menu";
    document.documentElement.className = startMenu;
    const i = document.createElement("i");
    i.className = "fi fi-ss-cross close-btn";
    document.documentElement.classList.add("nav-hide");

    i.addEventListener("click",() => {
        App.resume()
    },{ once: true });

    popupContainer.appendChild(i);

  } else {
    // Inicia por default main
    // Animacion de inicio
    Menu.box = container.querySelector(".box");
    Menu.animarInicio();
    Menu.changeMenu("main-menu");
    menuPause()
    // inicia en modo pausa
  }

  return container;
}

export default menuPage;
