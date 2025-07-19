import renderNav from '../componentes/renderNav.js';
import Navbar from '../managers/Nav.js';
import MenuApp from "../menu/App.js";

/*menus */
import memory from '../managers/Memory.js';
import menuControls from '../menu/componentes/controls.js';
import menuHelp from '../menu/componentes/help.js';
import menuMain from '../menu/componentes/main.js';
import menuOptions from '../menu/componentes/options.js';
import menuTutorial from '../menu/componentes/tutorial.js';





function menuPage(App, startMenu){

    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div class="header"></div>
            <img class="box" src="./src/assets/img/ui/open-box.png" />
        <div class="popup">
        </div>
        <div class="nav-footer">
        </div>
    </div>
    `
    const container = template.content.cloneNode(true);
    const navContainer = container.querySelector('.nav-footer')
    const popupContainer = container.querySelector('.popup')

    const Nav = renderNav()
    navContainer.appendChild(Nav)

    const Menu = new MenuApp(container)
    Menu.nav = new Navbar(navContainer)
    
    const menuContent = {
        name: 'main-menu',
        estado: 'main-menu-active',
        render:  menuMain,
        children: [
          {name: 'continue',estado: 'continue-menu-active'},
          {name: 'play',    estado: 'play-game'},
          {name: 'options', estado: 'options-menu-active', render: menuOptions},
          {name: 'help',    estado: 'help-menu-active',    render: menuHelp,
            children: [
              {name: 'tutorial', estado: 'resumen-submenu-active', render: menuTutorial},
              {name: 'controls', estado: 'controls-submenu-active',render: menuControls}
            ]
          }
        ]
    }


    //Animacion de inicio
    document.onload = document.body.classList.add("onload");

    container.querySelector('.box').addEventListener('animationend', ()=>{
        const config = memory.get('opciones')
        if( config.menu == 0 ){
            App.router('/intro')
        }else{
            Menu._createMenu(menuContent)
            Menu._aplicarConfiguracionDelJuego()
            Menu.showMenu(true)
            if(startMenu){
                Menu.cambiarMenu(startMenu)
            }else{
                Menu.cambiarMenu('main-menu')
            }
        }
        document.body.classList.remove('onload')
    },{once:true})

    // usa index.css
    document.documentElement.classList.add('intro');

    return container
}


export default menuPage


