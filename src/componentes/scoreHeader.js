function scoreHeader(contexto) {
    const template = document.createElement("template");
  
    template.innerHTML = `
      <img height="60px" src="src/assets/img/ui/high-score.png">
      <h1 class="score-bar">
         <img height="35px" src="src/assets/img/ui/coin.png"></i>
         <p class="score-item"></p>
      </h1>
      `;
    const container = template.content.cloneNode(true);
  
    return container;
  }
  
  export default scoreHeader;