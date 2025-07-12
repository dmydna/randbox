

function renderPopup(){
        const template = document.createElement("template");

        template.innerHTML = `
        <div class="popup">
            <img class="popup-ico">
            <div class="heart-bar"></div>  
            <div class="popup-btn">
            <i class="fi"></i> 
        </div>
        `
        const container = template.content.cloneNode(true);

        return container
}

export default renderPopup