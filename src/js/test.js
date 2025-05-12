import {randboxQuiz, preguntasQuiz, checkBtn, cantAp} from './quiz.js'




function runTestKey(event, func, key, time=500){
    if(event.key == key){
      const intervalo = setInterval (() => {
        func();
        if(randboxQuiz.juego.haTerminado()){
          checkBtn.click()
          clearInterval(intervalo)
        }
      }, time )
    }
}
  
  
function ganarRapido(){
    randboxQuiz.juego.preguntasDisponibles = []
}
  
  
function perderRapido(event){
    randboxQuiz.juego.intentosRestantes = 0
}
  
  
function mostrarRespuesta(){
    // pierde el juego sin usar UI
    let pregunta = randboxQuiz.juego.obtenerPreguntaActual()
    let respuesta = preguntasQuiz[pregunta]
    cantAp.innerHTML = respuesta
    cantAp.style.color = "red"
    setTimeout(()=>{  cantAp.style.color = "black" }, 1000)
}


function perderJuego(event, key){
    let pregunta = randboxQuiz.juego.obtenerPreguntaActual()
    let respuesta = Number(preguntasQuiz[pregunta])+1 
    randboxQuiz.juego.verificarRespuesta(respuesta)
    pregunta = randboxQuiz.juego.siguientePregunta()
}
  
function  ganarJuego (){
    let pregunta = randboxQuiz.juego.obtenerPreguntaActual()
    let respuesta = preguntasQuiz[pregunta]
    randboxQuiz.juego.verificarRespuesta(respuesta)
    pregunta = randboxQuiz.juego.siguientePregunta()
}


document.addEventListener('keydown', function(event) {

    // testea sin ui
  
    // muestra cada respuestas correctas
    runTestKey(event, mostrarRespuesta, 'r') 
    // responde mal alguna pregunta hasta perder
    runTestKey(event, perderJuego, 'p')
    // hackea el quiz para ganar
    runTestKey(event, ganarRapido, 'a')
    // hackea el quiz para perder
    runTestKey(event, perderRapido, 'b')
  
});

export {}