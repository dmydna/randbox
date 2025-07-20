import memory       from '../managers/Memory.js';
import renderNav    from '../componentes/renderNav.js';
import Navbar       from '../managers/Nav.js';
import MenuApp      from '../menu/App.js';
import menuControls from '../menu/componentes/controls.js';
import menuHelp     from '../menu/componentes/help.js';
import menuMain     from '../menu/componentes/main.js';
import menuOptions  from '../menu/componentes/options.js';
import menuTutorial from '../menu/componentes/tutorial.js';



const menuPage = (App, startMenu=null) => {

    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div class="header"></div>
            <img class="box" src="/src/assets/img/ui/open-box.png" />
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


    if(startMenu){
        // Renderiza pagina basada en menu
        // crea instancia unica de menu
        Menu._createMenu(menuContent)
        Menu.showMenu(true)
        Menu.cambiarMenu(startMenu)
        document.documentElement.className = 'menu'
        navContainer.style.visibility = 'hidden'
        const i = document.createElement('i')
        i.className = 'fi fi-ss-cross close-btn'
        i.addEventListener('click', ()=>{
            App.router('/menu')
        },{once: true})
        popupContainer.appendChild(i)
    }else{
        // Inicia por default main
        // Animacion de inicio
        document.onload = document.body.classList.add("onload");
        const config = memory.get('opciones')

        container.querySelector('.box').addEventListener('animationend', ()=>{
            if( config.menu == 0 ){
                App.router('/intro')
            }else{
                Menu._createMenu(menuContent)
                Menu.showMenu(true)
                Menu.cambiarMenu('main-menu')
            }
            document.body.classList.remove('onload')
        },{once:true})
    }

    return container
}


export default menuPage


