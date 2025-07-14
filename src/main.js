const shuffleArr =  (array) => {
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const preguntasDefault =  ["apple","cheese","hamburger","rocket","coin","box","dado"]


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
  velocidad :4,
  memoria :0
}


const objectsImgs = shuffleArr(preguntasDefault.slice(0, configDefault.vidas))
const partidaDefault = {}

objectsImgs.forEach(element => {
  partidaDefault[element] = 0
});


const juegoDefault = {
  preguntas : preguntasDefault,
  opciones :  configDefault ,
  memoria:    memoriaDefault,
  partida:    partidaDefault
}





// Precargar Imagenes

const src_obj = "src/assets/img/objects/"
const src_pop = "src/assets/img/popup/"
const src_ui = "src/assets/img/ui/"


objectsImgs.map((src) => {
  let img = new Image();
  img.src = src_obj +`${src}.png`;
});

// (quizPage)

const ui_imgs =["like", "skull", "game-over","win"];

ui_imgs.map( (src, index) => {
  let img = new Image();
  img.src = src_pop + `${src}.png`;
})

export {  
   src_obj, 
   src_pop, 
   src_ui, 
   juegoDefault
};
