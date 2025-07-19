import { AppMemory } from '../utils/default.js';
import { encrypt, decrypt } from '../utils/utils.js';



class MemoryManager {

  constructor() {
    this._Default = AppMemory;
    this._Data = this.load();
  }

  refresh() {
    try {
      localStorage.setItem("appStorage", JSON.stringify(this._Data));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }
    return this._Data;
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem("appStorage"))
         || JSON.parse(JSON.stringify(this._Default));

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
    this.set(name, this._Default[name])
  }

  
  fullreset(){
    this._Data = JSON.parse(JSON.stringify(this._Default));
    this.refresh();
  }

  clear(bool){
    if(bool){
      localStorage.clear()
    }
  }
}



export default MemoryManager