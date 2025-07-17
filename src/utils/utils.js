const classToggle = (event, hoverClass, targetElem=null)=>{
  if(event.type == 'mouseover'){
    if(targetElem != null){
      targetElem.classList.add(hoverClass)
    }else{
      event.target.classList.add(hoverClass)   
    }

  }
  if(event.type =='mouseout'){
    if (targetElem != null){
      targetElem.classList.remove(hoverClass)
    }else{
      event.target.classList.remove(hoverClass)
    }

  }
}

function hoverClassToggle(elem, hoverClass, targetElem ){
  elem.addEventListener('mouseover', (event) => {
    classToggle(event,hoverClass,targetElem)  
  } )
  elem.addEventListener('mouseout',(event) =>{
    classToggle(event,hoverClass,targetElem)   
  })
}


function hoverFlatIcon(elem,type=null){
  const child = elem.children[0]
  let classHover = child.classList[1]
  if(type!=null){
    classHover = classHover.replace(/(fi-)(rr)(-[\w-]+)/, '$1'+ type + '$3' ) 
  }else{
    classHover = classHover.replace(/(fi-)(rr)(-[\w-]+)/, '$1sr$3' ) 
  }

  hoverClassToggle(elem, String(classHover),child)
}



const shuffleArr =  (array) => {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



export {hoverFlatIcon, hoverClassToggle, shuffleArr}