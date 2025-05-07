
const randbox = document.querySelector(".randbox");


const backBtn = document.querySelector('.ltBtn')
const homeBtn = document.querySelector('.midBtn')
const infoBtn = document.querySelector('.rtBtn')

const ui = document.querySelector(".ui")
const score_container = document.querySelector(".score")

const preguntasQuiz = JSON.parse(localStorage.getItem("preguntasQuiz"));
const puntuacion = JSON.parse(localStorage.getItem("score"));

score_container.innerHTML = `score: ${puntuacion}`;


backBtn.addEventListener('click', () => {window.location.href = "../quiz.html"  })


homeBtn.addEventListener('click', () => { window.location.href = "../index.html" } )
infoBtn.addEventListener('click', () => { window.location.href = "../info.html" } )

for (const clave in preguntasQuiz) {
  if (preguntasQuiz.hasOwnProperty(clave)) { 
    
    const valor = preguntasQuiz[clave];
    
    const nuevaImg = document.createElement('img');
    const imgContainer = document.createElement('div');
    const cantAp = document.createElement("h2");

    nuevaImg.classList.add("gift")
    cantAp.classList.add("cantAp")
    imgContainer.classList.add("imgContainer")

    cantAp.innerHTML = valor;
    nuevaImg.src = `src/img/objetos/${clave}.png`;
  
    imgContainer.appendChild(nuevaImg);
    imgContainer.appendChild(cantAp);

    randbox.appendChild(imgContainer);

  }
}



  //localStorage.clear();
