import renderNav from './render/renderNav.js';
import MenuApp from "../Menu/Menu.js"
import Navbar from '../Componentes/Nav.js';
import App    from '../pages/AppMain.js'

/*menus */
import menuOptions from '../Menu/sections/options.js';
import menuControls from '../Menu/sections/controls.js';
import menuHelp from '../Menu/sections/help.js';
import menuMain from '../Menu/sections/main.js';
import menuTutorial from '../Menu/sections/tutorial.js';





function menuPage(App){


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



    document.onload = document.body.classList.add("onload");

    container.querySelector('.box').addEventListener('animationend', ()=>{
        Menu._aplicarConfiguracionDelJuego()
        if( Menu.estado != 'visible' ){
            App.router('/intro')
        }else{
            Menu._createMenu(menuContent)
            Menu.showMenu(true)
        }
        document.body.classList.remove('onload')
    },{once:true})

    document.documentElement.classList.add('intro');

    return container
}


export default menuPage


