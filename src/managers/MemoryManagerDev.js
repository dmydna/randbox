import { AppMemory } from "../utils/default.js";

/*Nota: MemoryManager.check
para las claves , se checkea que coincidan  AppStorage con AppMemory
para los valores, se checkea la version  AppStorage con AppMemory
*/

class MemoryManager {
  constructor() {
    this.storage = "appStorage" // define clave de local storage 
    this._Default = AppMemory; // es el valor de appStorage por default 
    this._Data = this.load();
  }


  refresh() {
    try {
      localStorage.setItem(this.storage, JSON.stringify(this._Data));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }
    return this._Data;
  }


  check(){
    const keys1 = Object.keys(this._Data)
    const keys2 = Object.keys(this._Default)

    const mismaKeys= 
    keys1.length === keys2.length &&
    keys1.every(key => keys2.includes(key)) &&
    keys2.every(key => keys1.includes(key));

    if(!mismaKeys){
      this._Data = localStorage.setItem(this.storage, JSON.stringify(this._Default));
      console.log("AppStorage corrupted fix!")
      return this._Data
    }

    if(this._Data && this._Data.version == this._Default.version){
      return this._Data
    }else{
      console.log("AppStorage actualizado!")
      this._Data = localStorage.setItem(this.storage, JSON.stringify(this._Default));
      return this._Data
    }
  }
  load() {
    try {
      return (
        JSON.parse(localStorage.getItem(this.storage)) ||
        JSON.parse(JSON.stringify(this._Default)) )
      ;
    } catch (e) {
      console.error("Error al cargar localStorage, usando Default:", e);
      return JSON.parse(JSON.stringify(this._Default));
    }
  }

  set(name, value) {
    if (value === this._Data) {
      throw new Error("No se puede guardar el objeto en sí mismo como valor");
    }
    this._Data[name] = value;
    this.refresh();
  }


  get(name) {
    this._Data = this.load();
    return this._Data[name];
  }

  reset(name) {
    this.set(name, this._Default[name]);
  }

  fullreset() {
    this._Data = JSON.parse(JSON.stringify(this._Default));
    this.refresh();
  }

  clear(bool) {
    if (bool) {
      localStorage.removeItem(this.storage)
    }
  }
}

export default MemoryManager;
