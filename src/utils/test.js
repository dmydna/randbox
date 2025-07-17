import { preguntasQuiz, QuizGame } from "../pages/quizPage.js";


const cantAp = document.body.querySelector('.user-reply')


function runTestKey(event, func, key, iterations, time = 600) {
  if (event.key == key) {
    const intervalo = setInterval(() => {
      func();
      if (QuizGame.juego.haTerminado() && !iterations) {
        Nav.middle.click();
        clearInterval(intervalo);
      } else if (iterations <= "0") {
        clearInterval(intervalo);
      }
      iterations--;
    }, time);
  }
  return iterations;
}

function ganarRapido() {
  QuizGame.juego.preguntasDisponibles = [];
}

function perderRapido(event) {
  QuizGame.juego.intentosRestantes = 0;
}

function mostrarRespuesta() {
  // pierde el juego sin usar UI
  let pregunta = QuizGame.juego.obtenerPreguntaActual();
  let respuesta = preguntasQuiz[pregunta];
  cantAp.innerHTML = respuesta;
  cantAp.style.color = "red";
  setTimeout(() => {
    cantAp.style.color = "black";
  }, 900);
}

function perderJuego(event, key) {
  let pregunta = QuizGame.juego.obtenerPreguntaActual();
  let respuesta = Number(preguntasQuiz[pregunta]) + 1;
  QuizGame.juego.verificarRespuesta(respuesta);
  pregunta = QuizGame.juego.siguientePregunta();
}

function ganarJuego() {
  let pregunta = QuizGame.juego.obtenerPreguntaActual();
  let respuesta = preguntasQuiz[pregunta];
  QuizGame.juego.verificarRespuesta(respuesta);
  pregunta = QuizGame.juego.siguientePregunta();
}

document.addEventListener("keydown", function (event) {
  // testea sin ui
  // muestra cada respuestas correctas
  runTestKey(event, mostrarRespuesta, "r");
  // responde mal alguna pregunta hasta perder
  runTestKey(event, perderJuego, "b");
  // hackea el quiz para ganar
  runTestKey(event, ganarRapido, "a");
  // hackea el quiz para perder
  runTestKey(event, perderRapido, "p");
});

function runAnimation(callback, iterations = 10, time = 600) {
  const intervalo = setInterval(() => {
    callback(iterations);
    if (iterations <= "0") {
      clearInterval(intervalo);
    }
    iterations--;
  }, time);
}

export { };

