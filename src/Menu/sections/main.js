import { hoverFlatIcon } from '../../componentes/navbar.js';
import memory from "../../games/Memory.js";
import App from "../../pages/AppMain.js";





function _playNewGame(game,cantidadItentos){
  game.intentos = cantidadItentos
  game.jugar();
  return
}



function menuMain(menu) {

   // Agrega Menu Items
   const menuItems = [
        {id: 'play-btn',     title: 'PLAY',     ico :'fi fi-rr-play' ,   },
        {id: 'continue-btn', title: 'CONTINUE', ico :'fi fi-rr-dice-d10' },
        {id: 'options-btn', title: 'OPTIONS',  ico :'fi fi-rr-settings'  },
        {id: 'help-btn',     title: 'HELP',     ico :'fi fi-rr-info'     }
  ];

  const container = document.createElement("section");
  container.classList.add("main-menu");
  const img = document.createElement('img')

  img.src = '/src/assets/img/popup/menu-game.png'
  img.className = 'popup-ico'
  img.height = '100px'

  container.appendChild(img) 
  const ul = document.createElement("ul")
  ul.classList.add("menu");

  // Agrega Handlers 
  menuItems.forEach((prop)=>{
    const li = createMainItem(prop);
    li.addEventListener('click', (e)=>{
      switch(prop.id){
        case 'play-btn': _playMenuHandler(menu); break;
        case 'continue-btn': _continueGameHandler(); break;
        case 'options-btn': menu.cambiarMenu('options'); break;
        case 'help-btn': menu.cambiarMenu('help'); break;
      }
    })
    ul.appendChild(li);
  });
  container.appendChild(ul);

  return container
}



// Handlers

function _continueGameHandler(){
    App.fastRender('quiz')
 }
 

function _playMenuHandler(menu){


    document.querySelector(".box").style.opacity = "0"

    setTimeout(()=>{
        menu.showMenu(false)
        document.body.classList.add('onStartGame')
        document.querySelector(".box").style.opacity = "1"
        App.router('/intro')
    },800) 

    document.querySelector('.box').addEventListener('animationend', ()=>{ 
        document.body.classList.remove('onStartGame') 
    }, {once:true})

    memory._memoryReset('memoria')
}

// Auxiliares

function createMainItem(prop) {

    const li = document.createElement("li");
    li.className = prop.id
  
    const i = document.createElement('i')
    i.className = prop.ico

    const span = document.createElement('span')
    span.textContent = prop.title


    li.appendChild(i)
    li.appendChild(span)

    hoverFlatIcon(li)

    return li;
}
  


export default menuMain