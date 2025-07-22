function menuTutorial(menu) {
  const template = document.createElement("template");

  template.innerHTML = `
    <section class="tutorial-menu">
      <div class="menu">
        <h1><i class="fi fi-ss-gamepad"></i> Cómo jugar</h1>
        <ul>
         <li>Haz clic sobre la caja para comenzar.</li>
         <li>Cuenta cuántas veces aparece cada objeto.</li>
         
         <h2>En la sección de respuestas :</h2>
         
         <li>Ingresa la cantidad de apariciones para cada objeto.</li>
         <li>Usa el botón <i class="fi fi-rr-refresh"></i> para reiniciar el contador.</li>
         <li>Usa el botón <i class="fi fi-rr-plus"></i> para incrementar el contador.</li>
         <li>Usa el botón <i class="fi fi-rr-social-network"></i> para enviar tu respuesta.</li>
         
         <h2><i class="fi fi-rr-bell"></i> Tips :</h2>
        
         <li>Haz clic sobre un <b>objeto</b> para pasar al siguiente.</li>
         <li>Haz clic en el <b>contador</b> para incrementarlo rápidamente.</li>
         <li>Puedes usar el <b>teclado</b> para jugar más rápido (ver controles).</li>
        </ul>
      </div>
  </sección>
    `;
  const container = template.content.cloneNode(true);

  document.documentElement.style.setProperty("--menu-title", 0)

  return container;
}

export default menuTutorial;
