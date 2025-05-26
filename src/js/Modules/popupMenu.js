import { devMode, gift_img, limitClicks } from "../../../config.js";
import { MiniJuegoApp } from "./miniJuegoApp.js";
import { hoverFlatIcon } from "./navbar.js";


const range = document.querySelectorAll('.range');
const interuptor = document.querySelectorAll('.interuptor')
const popup = document.querySelector('.popup')
const navFooter = document.querySelector('.nav-footer')


let cantidadItentos = limitClicks

let ultimoMenuActivo = null;
let ActualMenuActivo = null;

// Menu Sections
const [mainMenu, controlMenu, configMenu, helpMenu, resumenSubMenu, goMenu] = popup.children
// Main Menu
const [imgMainMenu, btnMainMenu] = mainMenu.children
const [playBtn, optionsBtn, helpBtn] = btnMainMenu.children
// Help Menu
const[resumeBtn, controlsBtn] = helpMenu.children[0].children
// Play



const GameConfigDefault = {"menu":1,"progreso":1,"vidas":3,"dificultad":4,"teclado":1,"velocidad":3}

const GameConfig =  JSON.parse(localStorage.getItem("GameConfig")) || GameConfigDefault
localStorage.setItem("GameConfig", JSON.stringify(GameConfig));



if(devMode){
    cantidadItentos = limitClicks;
}
  


document.querySelectorAll('.main-menu li').forEach((elem)=>{
    hoverFlatIcon(elem)
})

document.querySelectorAll('.help-menu li').forEach((elem)=>{
    hoverFlatIcon(elem)
})





//Main Menu

playBtn.addEventListener('click', ()=>{


    cantidadItentos = GameConfig['dificultad']

    document.body.classList.remove('main-menu-active')
    document.body.classList.add('go-menu-active')



    setTimeout(()=>{
        document.body.classList.remove('go-menu-active','popup-active')
        popup.style.display = 'none'
        document.body.classList.add('onStartGame')

        const minijuego = new MiniJuegoApp(gift_img, cantidadItentos);
        minijuego.jugar();
    },800) 

    document.querySelector('.box').addEventListener('animationend', ()=>{ 
        document.body.classList.remove('onStartGame') 
        console.log('DADAD')
    }, {once:true})
})

optionsBtn.addEventListener('click', ()=>{
    ultimoMenuActivo = 'main-menu-active';
    ActualMenuActivo = 'options-menu-active';
    document.body.classList.add(ActualMenuActivo)
    document.body.classList.remove(ultimoMenuActivo)
})

helpBtn.addEventListener('click', (event)=>{
    ultimoMenuActivo = 'main-menu-active';
    ActualMenuActivo = 'help-menu-active';

    document.body.classList.add(ActualMenuActivo)
    document.body.classList.remove(ultimoMenuActivo)
})


// Help Menu 

resumeBtn.addEventListener('click', ()=>{
    ultimoMenuActivo = 'help-menu-active';
    ActualMenuActivo = 'resume-submenu-active';

    document.body.classList.add(ActualMenuActivo)
    document.body.classList.remove(ultimoMenuActivo)

})


controlsBtn.addEventListener('click', ()=>{

    ultimoMenuActivo = 'help-menu-active';
    ActualMenuActivo = 'controls-submenu-active'

    document.body.classList.add(ActualMenuActivo)
    document.body.classList.remove(ultimoMenuActivo)


})


// options menu configs

range.forEach((elem, index)=>{
    const elemInput = elem.children[0];
    const classElem = elemInput.classList[0]
    const elemValue = document.createElement('span')

    elemInput.value = GameConfig[classElem]
    elemValue.innerHTML = elemInput.value;
    elem.appendChild(elemValue)

    elemInput.addEventListener('input', (e) => {
        let valor = e.target.value
        elemValue.innerHTML = valor
        GameConfig[classElem] = Number(valor)
        localStorage.setItem("GameConfig", JSON.stringify(GameConfig));
        aplicarConfiguracionDelJuego()
    })

})



interuptor.forEach((elem, index)=>{
    let classElem = elem.classList[1]
    elem.innerHTML = GameConfig[classElem] == 1 ? 'ON' : 'OFF' 
    
    elem.addEventListener('click', (e)=>{
        let classElem = e.target.classList[1]
        if(GameConfig[classElem] == 1){
            elem.innerHTML = 'OFF'
            GameConfig[classElem] = 0;
        }else{
            elem.innerHTML = 'ON'
            GameConfig[classElem] = 1;
        }
        localStorage.setItem("GameConfig", JSON.stringify(GameConfig));
        aplicarConfiguracionDelJuego()
    })
})



const atrasBtn = document.querySelector('.ltBtn')
atrasBtn.addEventListener('click', ()=> {

    if(!document.querySelector('.main-menu-active')){
        console.log(ultimoMenuActivo)
        document.body.classList.add(ultimoMenuActivo)
        document.body.classList.remove(ActualMenuActivo)
    
        ActualMenuActivo = ultimoMenuActivo;
        ultimoMenuActivo = 'main-menu-active';
    }
})



function aplicarConfiguracionDelJuego(){

    // progreso


    const showProgress = GameConfig['progreso'] * 0.5;
    const showMenu = GameConfig['menu']
    const speedGame = (-1) * GameConfig['velocidad'] + 5.5 + 's'
    const lives = GameConfig['vidas']
    const html =  document.documentElement

    html.style.setProperty('--progress-enable',  showProgress)
    html.style.setProperty('--menu-enable', showMenu)
    html.style.setProperty('--animation-time', speedGame )
    html.style.setProperty('--hearts', lives)
  
    if(GameConfig['menu'] == 0 && document.querySelector('.onload')){
      // incia el juego sin menu
      const minijuego = new MiniJuegoApp(gift_img, GameConfig['vidas']);
      minijuego.jugar()
    }else if(document.querySelector('.onload')){
      // incia menu
      // el Menu inicia el juego
      document.body.classList.add('popup-active')
       document.body.classList.add('main-menu-active')
    }
  }
  


export { aplicarConfiguracionDelJuego, GameConfig };
