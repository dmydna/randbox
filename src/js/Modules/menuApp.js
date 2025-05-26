class MenuApp {
    constructor(){
        this.menuActual;
        this.menuAnterior;
        this.nuevoMenu();
    }

    nuevoMenu(){
        this.mainMenu = document.querySelector('.main-menu')
        this.helpMenu = document.querySelector('.help-menu')

        this.range = document.querySelectorAll('.range');
        this.interuptor = document.querySelectorAll('.interuptor')
        // main menu
        this.playBtn = this.mainMenu.children[0];
        this.optionsBtn = this.mainMenu.children[1];
        this.helpBtn = this.mainMenu.children[2];
        // help menu
        this.resumeBtn = this.helpMenu.children[0];
        this.controlsBtn = this.helpMenu.children[1];
    }
    iniciarMenu(){
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
    }

}