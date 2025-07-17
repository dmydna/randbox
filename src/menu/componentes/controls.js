
function menuControls(){

    const keys = [
        {id: 'm',     title: 'menu'       },
        {id: 'back',  title: 'atras/reset'},
        {id: 'space', title: 'saltar/inc' },
        {id: 'enter', title: 'confirmar'  },
    ]
    
    const template = document.createElement("template");

    template.innerHTML = `
    <section class="controls-submenu">
        <ul class="menu"></ul>
    </section>
    `
    const container = template.content.cloneNode(true);
    const menuContainer = container.querySelector('.menu')

    keys.forEach(({id, title})=>{
        menuContainer.innerHTML += `
            <li> 
               <p>${title}</p> 
               <div style="display: flex; gap: 10px;">  
                 <img src="./src/assets/img/keyboard/${id}.png">
               </div>
            </li>
        `
    })

    return container
}

export default menuControls;