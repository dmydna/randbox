// function onMouseOverhandler(){
//     // TODO
//     return
// }


function renderNav(){

        const template = document.createElement("template");

        template.innerHTML = `
            <div class="nav-btn ltBtn">
                <i class="nav-btn fi"></i>
            </div>
            <div class="nav-btn midBtn">
                <i class="fi"></i>
            </div>
            <div class="nav-btn rtBtn">
                <i class="fi"></i>
        `
        const container = template.content.cloneNode(true);
   
        container.refs = {
            left: container.querySelector('.ltBtn .fi'),
            middle: container.querySelector('.midBtn .fi'),
            right: container.querySelector('.rtBtn .fi')
        }
        // b1.firtsChild.classList.add("fi-rr-angle-left")
        // b2.firtsChild.classList.add("fi-rr-home")
        // b3.firtsChild.classList.add("fi-rr-info")

        //  TODO: 
        //  agrego eventos segun contexto

        // b1.addEventListener('click', contexto.handler1)
        // b1.addEventListener('onmouseove', () => onMouseOverhandler)

        // b2.addEventListener('click', contexto.handler2)
        // b1.addEventListener('onmouseove', () => onMouseOverhandler)

        // b3.addEventListener('click', contexto.handler3)
        // b1.addEventListener('onmouseove', () => onMouseOverhandler)


        return container
}


export default renderNav