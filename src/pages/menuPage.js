import memory from '../managers/Memory.js';
import MenuApp from '../menu/App.js';
import menuControls from '../menu/componentes/controls.js';
import menuHelp from '../menu/componentes/help.js';
import menuMain from '../menu/componentes/main.js';
import menuOptions from '../menu/componentes/options.js';
import menuTutorial from '../menu/componentes/tutorial.js';



const menuPage = (App, startMenu=null) => {

    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <img class="box" src="/src/assets/img/ui/open-box.png" />
        <div class="popup"></div>
    </div>
    `
    
    const appNav = App.navbar
    const appHeader = App.headerElem

    const container = template.content.cloneNode(true);
    const navContainer = appNav.container
    const popupContainer = container.querySelector('.popup')


    const Menu = new MenuApp(container)
    Menu.nav = App.navbar
    
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
        Menu.createMenu(menuContent)
        Menu.showMenu(true)
        Menu.cambiarMenu(startMenu)
        document.documentElement.id= 'menu'
        document.documentElement.className = startMenu
        const i = document.createElement('i')
        i.className = 'fi fi-ss-cross close-btn'
        document.documentElement.classList.add('nav-hide')
        i.addEventListener('click', ()=>{
            history.back();
        },{once: true})






        popupContainer.appendChild(i)

    }else{
        // Inicia por default main
        // Animacion de inicio
        const config = memory.get('opciones')

        Menu.createMenu(menuContent)
        Menu.box = container.querySelector('.box')
        Menu.animarInicio()

        
        Menu.cambiarMenu('main-menu')
    

        // container.querySelector('.box').addEventListener('animationend', ()=>{

        //     document.body.classList.remove('onload')
        // },{once:true})
    }




    return container
}


export default menuPage


