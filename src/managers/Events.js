import MemoryManagerEx from "./MemoryManager.js";

class EventManager extends MemoryManagerEx {
  constructor() {
    super();
    this.currentHandlers = [];
  }

  _addEvent(el, ev, handler) {
    el.addEventListener(ev, handler);
    this.currentHandlers.push({ el, ev, handler });
  }

  _removeEvent(el, ev, handler) {
    el.removeEventListener(ev, handler);
    this.currentHandlers = this.currentHandlers.filter(
      (elem) => !(elem.el === el && elem.ev === ev && elem.handler === handler)
    );
  }

  _removeAllEvents() {
    this.currentHandlers.forEach(({ el, ev, handler }) => {
      el.removeEventListener(ev, handler);
    });
    this.currentHandlers = [];
  }
}

export default EventManager;
