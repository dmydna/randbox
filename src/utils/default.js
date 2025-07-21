import { shuffleArr } from "./utils.js";

const Appimgs = {
  ui: ["higth-score", "home", "mystery", "open-box"],
  game: ["apple", "cheese", "hamburger", "rocket", "coin", "box", "dado"],
  popup: ["like", "skull", "game-over", "win"],
  keyboard: ["back", "enter", "m", "p", "space", "h"],
};

const preguntas = shuffleArr(Appimgs.game);

const opciones = {
  menu: 1,
  progreso: 1,
  vidas: 3,
  dificultad: 5,
  teclado: 1,
  velocidad: 5,
  memoria: 1,
  intentos: 8,
};

const quiz = Object.fromEntries(
  preguntas.slice(0, opciones.dificultad).map((element) => [element, 0])
);

const partida = {
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

const AppMemory = {
  preguntas: preguntas,
  opciones: opciones,
  partida: partida,
  token: "init",
};

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

export { AppMemory, src_obj, src_pop, src_ui, preloadImages };
