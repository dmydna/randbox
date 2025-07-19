

function menuHelp(menu) {
    

    const container = document.createElement("section");
    container.classList.add("help-menu");
  
    container.innerHTML = /*html*/`
     <ul class="menu">
        <li class="tutorial-ref" >
           <i class="fi fi-rr-play"></i>como jugar?
        </li>
        <li class="controls-ref" > 
          <i class="fi fi-rr-settings"></i>ver controles
        </li>
        <li class="info-ref" > 
          <i class="fi fi-rr-info"></i>creditos
        </li>
     </ul>
    `
    const li_tutorial = container.querySelector('.tutorial-ref')
    const li_controls =  container.querySelector('.controls-ref')
    const li_info =  container.querySelector('.info-ref')


    li_controls.addEventListener('click', () => menu.cambiarMenu('controls') )
    li_tutorial.addEventListener('click', () => menu.cambiarMenu('tutorial') )
    li_info.addEventListener('click', () => window.location.href = '/info' )


    return container
  }

export default menuHelp



