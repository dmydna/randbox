import { juegoDefault } from '../utils/default.js';




class MemoryManager {

  constructor() {
    this._Default = juegoDefault;
    this._Data = this._loadMemory();
  }

  _saveMemory() {
    try {
      localStorage.setItem("appStorage", JSON.stringify(this._Data));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }
    return this._Data;
  }

  _loadMemory() {
    try {
      return JSON.parse(localStorage.getItem("appStorage")) || JSON.parse(JSON.stringify(this._Default));
    } catch (e) {
      console.error("Error al cargar localStorage, usando Default:", e);
      return JSON.parse(JSON.stringify(this._Default));
    }
  }

  _setMemory(name, value) {
    if (value === this._Data) {
      throw new Error("No se puede guardar el objeto en sí mismo como valor");
    }
    this._Data[name] = value;
    this._saveMemory();
  }

  _getMemory(name) {
    this._Data = this._loadMemory();
    return this._Data[name];
  }

  _memoryReset(name) {
    this._setMemory(name, this._Default[name])
  }

  
  _memoryFullReset(){
    this._Data = JSON.parse(JSON.stringify(this._Default));
    this._saveMemory();

  }
}



export default MemoryManager