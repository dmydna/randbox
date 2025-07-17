function menuTutorial(menu){

    const template = document.createElement("template");

    template.innerHTML = `
    <ul class="menu">
        <p style="width: 100%; margin-inline: auto;">
            Haz click en la caja para lanzarla, cuenta las apariciones 
            de los objetos que se dejan ver y
            responde el <b>quiz</b> 
        </p>
    </ul>
    `
    const container = template.content.cloneNode(true);

    return container
}

export default menuTutorial