function renderQuiz(contexto) {
  const template = document.createElement("template");

  template.innerHTML = `
        <div class="points"></div>
        <div class="randbox">
            <div style="margin-top: 20px;"  class="box-container">
              <div class="box-clicker">
                <img class="box" src="./src/assets/img/ui/open-box.png" />
              </div>
              <div class="respUser-clicker">
                <h1 class="user-reply"></h1> 
              </div>
            </div>
        </div> 
    `;
  const container = template.content.cloneNode(true);

  return container;
}

export default renderQuiz;
