# Randbox

Randbox es un minijuego web, similar a un juego de trivia, con una idea muy simple invita al jugador a contar la cantidad de apariciones de cada objeto que se muestra en pantalla.

Este proyecto se desarrollo con la idea de un armar SPA usando solamente js vanilla.


<img width="40%"  src="https://i.ibb.co/JFqHdVnc/randbox-preview.gif">

🔗 **Demo en vivo:** [https://randbox.netlify.app/](https://randbox.netlify.app/)

---

## 🚀 Tecnologías

- `page.js` – Librería ligera de routing para SPA, permite manejar rutas y navegación sin recargar la página.
- `vite` – Herramienta de build y desarrollo rápido para proyectos modernos de JavaScript, con recarga instantánea y bundling optimizado.
- `flaticon CSS` – Paquete de íconos de Flaticon en CSS, utilizado para mostrar iconos fácilmente en la interfaz.


---

## 📦 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/dmydna/randbox.git
cd randbox
npm install
npm run dev
```

---

## 📂 Estructura del proyecto

```
src/
 ├── assets/       # Imágenes y estilos
 ├── components/   # Componentes reutilizables
 ├── managers/     # Logica general de la SPA
 ├── pages/        # Páginas de la SPA
 ├── games/        # Logica del Juego
 ├── menu/         # Logica del Menu
 ├── templates/    # Plantillas HTML de la SPA  
 ├── utils/        # Helpers
 ├── App.js         
 └── main.js       # Punto de entrada

```
---

## 🖥️  Secciones de la SPA

1. Menu
2. Intro     
3. Quiz      
4. Score
5. About


> El acceso a ciertas rutas esta restringido hasta completar las distintas etapas del juego


---

### Menu

Se accede via UI o con la ruta `/menu` o por defecto  `/`. <br>
En Menu se encuentra toda la informacion para navegar y configurar la UI de la App.


####  Opciones de Menu

> Cada opcion afectara de forma distinta a la SPA

```
Options/
 ├── continuar partida    # Permite pausar juego y continuar
 ├── boton menu           # Muestra boton de menu 
 ├── teclado              # Jugar con teclado (en PC)
 ├── tutorial             # Tutorial (se activa por unica vez)
 ├── modo de juego/       # Distintas configuraciones del Juego
 |    ├── child/           
 |    ├── normal/          
 |    ├── default/         
 |    └── custom          # Muestra Configuracion manual (avanzado/)
 ├── avanzado/
 |    ├── velocidad       # Velocidad de animaciones (3 a 0.5)segs
 |    ├── dificultad      # Cantidad de imagenes distintas
 |    ├── vidas           # Cantidad de vidas
 |    └── intentos        # Canitdad de imagenes totales
 └── limpiar cache        # Borra partida 
```

#### Modo Pausa

Cuando la opcion esta activa, se puede pausar el juego aprentando el boton de __menu__. 
En este modo se muestra la opcion __continue__ en UI de MENU.

#### Modo tutorial

Cuando la opcion esta activa, se puede acceder de forma directa a la seccion de __tutorial__ de menu. 
`( menu > help > tutorial )`. <br>
En este modo se muestra una version UI ligeramente distinta del __mismo__ MENU.

---

### Intro 

Se accede via UI (al tocar `play / continue` en Menu) o directamente con la ruta: `/intro`. <br>
Es la primer parte del juego, el jugador arma la partida.
> Completar la primera parte dara acceso a otra vista de la SPA (quiz)

#

### Quiz

Se accede via UI (al tocar  `play / continue` en Menu) o directamente con la ruta: `/quiz`. <br>
En la segunda parte del juego, se debera responder un quiz basado en la primera parte.
> Completar la segunda parte dara acceso a otra vista de la SPA (score)

#

### Score

Se accede via UI (al tocar `score` en Menu) o directamente con la ruta: `/score`. <br>
Muestra el puntaje obtenido en la partida y todas las respuestas de la partida.
> Se desbloquea esta vista, al completar 'quiz'



