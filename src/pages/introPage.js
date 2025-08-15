import IntroGameApp from "../games/IntroGame/App.js";

function introPage(App){

    const template = document.createElement("template");

    template.innerHTML = `
    <div class="container">
        <div id="game-container"></div>
        <div class="progress-container"></div>
    </div>
    `
    const container = template.content.cloneNode(true); 

    IntroGameApp(App, container)

    return container
}


export default introPage




