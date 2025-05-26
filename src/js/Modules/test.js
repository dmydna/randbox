import { randboxQuiz, preguntasQuiz, checkBtn, cantAp } from "../quizPage.js";

function runTestKey(event, func, key, iterations, time = 600) {
  if (event.key == key) {
    const intervalo = setInterval(() => {
      func();
      if (randboxQuiz.juego.haTerminado() && !iterations) {
        checkBtn.click();
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
  randboxQuiz.juego.preguntasDisponibles = [];
}

function perderRapido(event) {
  randboxQuiz.juego.intentosRestantes = 0;
}

function mostrarRespuesta() {
  // pierde el juego sin usar UI
  let pregunta = randboxQuiz.juego.obtenerPreguntaActual();
  let respuesta = preguntasQuiz[pregunta];
  cantAp.innerHTML = respuesta;
  cantAp.style.color = "red";
  setTimeout(() => {
    cantAp.style.color = "black";
  }, 900);
}

function perderJuego(event, key) {
  let pregunta = randboxQuiz.juego.obtenerPreguntaActual();
  let respuesta = Number(preguntasQuiz[pregunta]) + 1;
  randboxQuiz.juego.verificarRespuesta(respuesta);
  pregunta = randboxQuiz.juego.siguientePregunta();
}

function ganarJuego() {
  let pregunta = randboxQuiz.juego.obtenerPreguntaActual();
  let respuesta = preguntasQuiz[pregunta];
  randboxQuiz.juego.verificarRespuesta(respuesta);
  pregunta = randboxQuiz.juego.siguientePregunta();
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

export {};
