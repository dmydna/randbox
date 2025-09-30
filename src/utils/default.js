import { shuffleArr } from "./utils.js";

// Mapping de todas las imagenes 
const Appimgs = {
  ui: ["higth-score", "home", "mystery", "open-box"],
  game: ["apple", "cheese", "hamburger", "rocket", "coin", "box", "dado"],
  popup: ["like", "skull", "game-over", "win"],
  keyboard: ["back", "enter", "m", "p", "space", "h"],
};

const preguntas = shuffleArr(Appimgs.game);

// Opciones globales de configuración de la App
const opciones = {
  menu:       1, // habilita menú de puntos (menuDots)
  progreso:   1, // muestra barra de progreso
  vidas:      3, // número de vidas iniciales
  dificultad: 5, // cantidad de imágenes distintas
  teclado:    1, // habilita uso de teclado
  velocidad:  5, // velocidad de animación (3s a 0.5s)
  memoria:    1, // permite retomar partida guardada
  intentos:   8, // cantidad de imágenes en total
  tutorial:   1, // activa tutorial inicial
  mode: 'default', // modo de juego (setea opciones por defecto)
};

// crea quiz Vacio basado en dificultad
const quiz = Object.fromEntries(
  preguntas.slice(0, opciones.dificultad).map((element) => [element, 0])
);


// Valores iniciales de partida de quiz
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

// Valores iniciales de partida de intro
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


// Valores por defecto de la memoria de la App
const AppMemory = {
  preguntas:     preguntas, // lista de todas las preguntas disponibles 
  opciones:      opciones,  // configuración global de la App
  partida_quiz:  partida_quiz, // estado inicial de partida en modo quiz
  partida_intro: partida_intro, // estado inicial de partida en modo introducción

  token: "init", // control de acceso y restricciones de rutas
  
  menu : {
    resume_to: null, // pantalla a la que se vuelve tras pausar
    pause: 0         // indica modo pausa activado
  },

  /**
   * Identificador de versión del esquema de AppMemory.
   * Usado por MemoryManager para detectar incompatibilidad entre
   * la estructura actual y la almacenada en localStorage.
   */
  version: '0.0111'
};



const src_obj = "src/assets/img/objects/";
const src_pop = "src/assets/img/popup/";
const src_ui  = "src/assets/img/ui/";

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





export { AppMemory, preloadImages, src_obj, src_pop, src_ui };

