import { shuffleArr } from "./utils.js";

// Mapping de todas las imagenes 
const Appimgs = {
  ui: ["higth-score", "home", "mystery", "open-box"],
  game: ["apple", "cheese", "hamburger", "rocket", "coin", "box", "dado"],
  popup: ["like", "skull", "game-over", "win"],
  keyboard: ["back", "enter", "m", "p", "space", "h"],
};

const preguntas = shuffleArr(Appimgs.game);

// afecta a toda la App
const opciones = {
  menu:       1,      // menuDots
  progreso:   1,
  vidas:      3,
  dificultad: 5,      // cantidad de imagenes distintas
  teclado:    1,
  velocidad:  5,      // velocidad de animacion (3s a 0.5s)
  memoria:    1,      // retoma partida
  intentos:   8,      // cantidad de imagenes en total
  tutorial:   1,        
  mode: 'default',    // modos de juego, setea las opciones 
};


// crea quiz Vacio basado en dificultad
const quiz = Object.fromEntries(
  preguntas.slice(0, opciones.dificultad).map((element) => [element, 0])
);

const partida_quiz = {
  resume : false,
  quiz: quiz,
  preguntasDisponibles: [],
  intentosDisponibles: 3,
  progreso: 0,
  puntaje: 0,
  estado: "_",
  respuesta: 0,
  score: 0,
  pregunta: "",
};

const partida_intro = {
  resume            : false,
  estado            : "",
  pregunta          : "",
  progreso          : "",
  index             : 0,
  intentos          : 0,
  intentosRestantes : 0,
  quiz              : {},
  preguntas         : ""
}


const AppMemory = {
  preguntas:     preguntas,      // mapea todas las preguntas disponibles
  opciones:      opciones,
  partida_quiz:  partida_quiz,
  partida_intro: partida_intro,
  token: "init",                 // restricciones de router
  resume_to: null,               // menu continue
  version: '0.0100'       
};

/*Nota: MemoryManagerEx.check
para las claves , se checkea que coincidan  AppStorage con AppMemory
para los valores, se checkea la version  AppStorage con AppMemory
*/


const src_obj = "src/assets/img/objects/";
const src_pop = "src/assets/img/popup/";
const src_ui = "src/assets/img/ui/";

// Precargar Imagenes

function preloadImages() {
  for (const [key, value] of Object.entries(Appimgs)) {
    value.forEach((src) => {
      let img = new Image();
      switch (key) {
        case "ui":
          img.src = src_ui + `${src}.png`;
          break;
        case "popup":
          img.src = src_pop + `${src}.png`;
          break;
        case "game":
          img.src = src_obj + `${src}.png`;
          break;
      }
    });
  }
}


// const navigationEvent = new CustomEvent("navigation:init", {
//   detail: {
//     type: "internal", // o "external"
//     from: "/menu",
//     to: "/juego"
//   }
// })


export { AppMemory, preloadImages, src_obj, src_pop, src_ui };

