function hoverClassToggle(elem, secondary, targetElem = null) {
  const target = targetElem || elem;
  const primary = target.className;

  const toggleHandler = (event) => {
    const style = event.type === "mouseover" ? secondary : primary;
    target.className = style;
  };

  elem.addEventListener("mouseover", toggleHandler);
  elem.addEventListener("mouseout", toggleHandler);
}

function hoverFlatIcon(elem, type = null) {
  const child = elem.children[0];
  const currentClass = child.classList[1];
  if (!currentClass) return;

  const classHover = currentClass.replace(
    /(fi-)(rr)(-[\w-]+)/,
    `$1${type || "sr"}$3`
  );

  hoverClassToggle(elem, `fi ${classHover}`, child);
}

const shuffleArr = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function encrypt(text, key) {
  let res = "";
  for (let i = 0; i < text.length; i++) {
    res += String.fromCharCode(
      text.fromCharCode(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(res); // encrypt base64
}

function decrypt(text, key) {
  const data = atob(text); //decrpt base64
  let res = "";
  for (let i = 0; i < datos.length; i++) {
    res += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return res;
}

export { hoverFlatIcon, hoverClassToggle, shuffleArr, encrypt, decrypt };
