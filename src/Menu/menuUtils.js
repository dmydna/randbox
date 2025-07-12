import { gift_img } from "../../../../config.js";
import Nav from "../Componentes/Nav.js";
import introGameApp from "../Games/IntroGame/App.js";
import { configDefault } from "../main.js";
import MenuApp from "./Menu.js";



const config  =  JSON.parse(localStorage.getItem("GameConfig")) || configDefault















export {  _playNewGame,  _memoryReset};
