//const gift_img = ["apple","cheese","hamburger","rocket","coin","box","dado"];

const shuffleArr =  (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const gift_img = shuffleArr(["apple","cheese","coin","hamburger"])
const cantVidas = 3;
const limitClicks = 2 * gift_img.length;



export { cantVidas, gift_img, limitClicks };

