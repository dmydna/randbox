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
        
        return container
}


export default renderNav