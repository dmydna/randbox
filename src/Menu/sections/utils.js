function _playMenuHandler(){
    const cantidadItentos = config['dificultad']
   
    document.querySelector(".box").style.opacity = "0"

    setTimeout(()=>{
        showMenu(false)
        document.body.classList.add('onStartGame')
        document.querySelector(".box").style.opacity = "1"
        _playNewGame()
    },800) 

    document.querySelector('.box').addEventListener('animationend', ()=>{ 
        document.body.classList.remove('onStartGame') 
    }, {once:true})

      
      _memoryReset()
}

function _playNewGame(cantidadItentos){
    introGame.intentos = cantidadItentos
    introGame.jugar();
    return
}

function _memoryReset(){
    localStorage.setItem("memoria", JSON.stringify({
        preguntasDisponibles : [],
        intentosDisponibles : config.vidas,
        progreso:0,
        puntaje:0,
        estado:"_",
        respuesta: 0
      }));
}

function _cambiarMenu(name){
    Menu.siguiente(name)
    const oldState = Menu.menuAtras.data
    const newState = Menu.menuActual.data
    document.body.classList.remove(oldState)
    document.body.classList.add(newState)
    _renderMenu()  
}


function showMenu(bool=true){
    const popup = document.querySelector('.popup')
    if(bool){
      document.body.classList.add('popup-active')
      document.body.classList.add(Menu.root.data)
    }else{
      document.body.classList.remove(Menu.root.data)
      document.body.classList.remove('popup-active')
      popup.style.display = 'none'
    }

  }


function _rangeMenuInit(range){
    range.forEach((elem, index)=>{
        const elemInput = elem.children[0];
        const classElem = elemInput.classList[0]
        const elemValue = document.createElement('span')
        elemInput.value = config[classElem]
        elemValue.innerHTML = elemInput.value;
        elem.appendChild(elemValue)
        elemInput.addEventListener('input', (e) => {
            let valor = e.target.value
            elemValue.innerHTML = valor
            config[classElem] = Number(valor)
            localStorage.setItem("GameConfig", JSON.stringify(config));
            _aplicarConfiguracionDelJuego()
        })
    
    })
}

function _interuptorMenuInit(interruptors){
    interruptors.forEach((elem, index)=>{
        let classElem = elem.classList[1]
        elem.innerHTML = config[classElem] == 1 ? 'ON' : 'OFF' 
        elem.addEventListener('click', (e)=>{
            let classElem = e.target.classList[1]
            if(config[classElem] == 1){
                elem.innerHTML = 'OFF'
                config[classElem] = 0;
            }else{
                elem.innerHTML = 'ON'
                config[classElem] = 1;
            }
            localStorage.setItem("GameConfig", JSON.stringify(config));
            _aplicarConfiguracionDelJuego()
        })
    })
}


function _optionMenuInit(){
    const ranges = document.querySelectorAll('.range');
    const interruptors = document.querySelectorAll('.interuptor')
    _rangeMenuInit(ranges)
    _interuptorMenuInit(interruptors)
}



function _continueGameInit(){
    if(config.memoria == 1){
        continueBtn.addEventListener('click',()=>{
            window.location.href = "../quiz.html"
        })
    }else{
        continueBtn.remove()
    }
}




function _updCssVars(config){
    const html =  document.documentElement
    html.style.setProperty('--progress-enable',  config.progreso * 0.5)
    html.style.setProperty('--menu-enable', config.menu)
    html.style.setProperty('--animation-time', (-1) * config.velocidad + 4.5 + 's' )
    html.style.setProperty('--hearts', config.vidas)
    html.style.setProperty('--continue-game', (config.memoria == 0) ? 'none' : 'flex')
}


export {_updCssVars}