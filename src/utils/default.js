
import { shuffleArr } from "./utils.js";

const Appimgs = {
  ui  :     ["higth-score","home","mystery","open-box"],
  game:     ["apple","cheese","hamburger","rocket","coin","box","dado"],
  popup:    ["like", "skull", "game-over","win"],
  keyborad: ["back","enter","m","p","space"]
}


const memoriaDefault = {
  preguntasDisponibles:[],
  intentosDisponibles:3,
  progreso:0,
  puntaje:0,
  estado:"_",
  respuesta:0
}


const configDefault = {
  menu :1,
  progreso :1,
  vidas :3,
  dificultad :4,
  teclado :1,
  velocidad :5,
  memoria :0
}


const preguntasDefault = shuffleArr(Appimgs.game).slice(0, configDefault.dificultad);

const partidaDefault = Object.fromEntries(
  preguntasDefault.map(element => [element, 0])
);

const juegoDefault = {
  preguntas : preguntasDefault,
  opciones :  configDefault ,
  memoria:    memoriaDefault,
  partida:    partidaDefault
}


// Precargar Imagenes

const src_obj = "src/assets/img/objects/"
const src_pop = "src/assets/img/popup/"
const src_ui =  "src/assets/img/ui/"


for (const [key, value] of Object.entries(Appimgs)) {
  value.forEach((src) => {
    let img = new Image();
    switch(key){
      case 'ui' :
       img.src = src_ui  + `${src}.png`;
       break;
      case 'popup':
       img.src = src_pop + `${src}.png`;
       break;
      case 'game':
       img.src = src_obj + `${src}.png`;
      break;
    }
  });
}






export { juegoDefault, src_obj, src_pop, src_ui };

