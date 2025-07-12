import renderNav from './render/renderNav.js';
import MenuApp from "../Menu/Menu.js"
import Navbar from '../Componentes/Nav.js';
import App    from '../pages/AppMain.js'



function menuPage(App){


    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div class="header"></div>
            <img class="box" src="./src/assets/img/ui/open-box.png" />
        <div class="popup"></div>
        <div class="nav-footer"></div>
    </div>
    `
    const container = template.content.cloneNode(true);
    const navContainer = container.querySelector('.nav-footer')

    const Nav = renderNav()


    navContainer.appendChild(Nav)

    const Menu = new MenuApp(container)
    Menu.nav = new Navbar(navContainer)

    
    document.onload = document.body.classList.add("onload");

    container.querySelector('.box').addEventListener('animationend', ()=>{
        
        Menu._aplicarConfiguracionDelJuego()
        if( Menu.estado != 'visible' ){
            App.router('/intro')
        }else{
            Menu._init()
            Menu.showMenu(true)
        }
        document.body.classList.remove('onload')
    },{once:true})

    document.documentElement.classList.add('intro');

    return container
}


export default menuPage


