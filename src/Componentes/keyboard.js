import {navbar} from './navbar.js'
import { juegoDefault } from '../main.js'



/* eventos de teclado */

function introKeyboard(event){
	// if(config.teclado == 'OFF'){
	// 	return
	// }
    // const box = document.querySelector(".box");
	// let count = config.dificultad;
    // if (event.key == "p") {
    //   document.body.style.pointerEvents = "none";
    //   const intervalo = setInterval(() => {
    //     box.click();
	// 	count --;
    //     if (count == 0) {
    //        clearInterval(intervalo);
    //     }
    //   }, 1000);
    // }
    // if (event.key == " ") {
    //   box.click();
    // }
}


document.addEventListener("keydown", function (event) {

});
  


function quizKeyboard(event){
	  if (event.key == 'Enter') {
	    if(document.body.className.includes("user-loses","user-wins")){
	      document.querySelector(".popup-btn").click()
	      return
	    }
	    navbar.middle.click()
	  }
	  if (event.key == '+') {
	    navbar.right.click()
	  }
	  if (event.key == ' ') {
	    navbar.right.click()
	  }
}



function quizKeyboardEnable(config){
	if(config){
		document.addEventListener('keydown', quizKeyboard)
	}else{
		document.removeEventListener('keydown', quizKeyboard)
	}
}


function introKeyboardEnable(config){
	if(config){
		document.addEventListener('keydown', introKeyboard)
	}else{
		document.removeEventListener('keydown', introKeyboard)
	}
}


  
export {introKeyboardEnable, quizKeyboardEnable, introKeyboard}
