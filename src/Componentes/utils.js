import { QuizGame } from "../pages/quizPage.js";




function AnswerInc(){
    const userAnswer = document.querySelector(".user-reply");
    userAnswer.innerHTML++;
}

function AnswerReset(){
    const userAnswer = document.querySelector(".user-reply");
    userAnswer.innerHTML = 0
}


function heartsOff(){
	let index = this.juego.intentosRestantes  
	setTimeout( ()=>{ this.corazones[index].classList.remove("fi-ss-heart"); } ,800)
	this.corazones[index].classList.add("fi-rr-heart") 
}



async function heartsReloadPromise(resolve){
	let i = 0;
	let intervalo = setInterval(() => {
	  i = i % this.corazones.length;
	  if (this.corazones[i]) {
		this.corazones[i].classList.remove("fi-rr-heart");
		this.corazones[i].classList.add("fi-ss-heart");
		i++;
	  }
	  if (i == this.corazones.length) {
		setTimeout(()=>{
		  clearInterval(intervalo);
		  resolve(true); 
		},300)
	  }
	}, 500);
}


function heartsReload() {
	return new Promise(resolve => {
	this.heartsReloadPromise(resolve)
	});
}




function heartsBuild() {
    for (let i = 0; i < this.juego.intentosRestantes; i++) {
      let heart = document.createElement("i");
      heart.classList.add("fi", "fi-ss-heart");
      this.barraCorrazones.appendChild(heart);
    }
    return this.barraCorrazones.children;
  }


export {AnswerInc, AnswerReset}