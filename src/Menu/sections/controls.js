
function menuControls(){

    return ( /*html*/ `
            <section class="controls-submenu">
                <ul class="menu">
                    <li> <p>menu</p> 
                        <div style="display: flex; gap: 10px;">  
                            <img src="./src/assets/img/keyboard/m.png">
                        </div>
                    </li>
                    <li> <p>atras/reset</p> 
                        <div style="display: flex; gap: 10px;"> 
                            <img src="./src/assets/img/keyboard/back.png">  
                        </div>
                    </li>
                    <li> <p>saltar/inc</p> 
                        <div style="display: flex; gap: 10px;"> 
                            <img src="./src/assets/img/keyboard/space.png">  
                        </div>
                    </li>
                    <li> <p>confirmar</p> 
                        <div style="display: flex; gap: 10px;"> 
                            <img src="./src/assets/img/keyboard/enter.png">  
                        </div>
                    </li>
                </ul>
            </section>
        `
    )
}

export default menuControls;