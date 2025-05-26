import { cantVidas, devMode, gift_img, limitClicks } from "../../config.js";

// Precargar Imagenes

gift_img.map((src) => {
    let img = new Image();
    img.src = `src/img/objetos/${src}.png`;
});

// (quizPage)

const ui_imgs =["like", "skull", "game-over","win","open-box"];

ui_imgs.map( (src, index) => {
  let img = new Image();
  img.src = `src/img/ui/${src}.png`;
})

export { cantVidas, devMode, gift_img, limitClicks };
