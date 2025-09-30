# 🎮 Randbox

__Randbox__ es un minijuego web de tipo trivia, en el que el jugador debe contar cuántas veces aparece cada objeto en pantalla.


<img width="35%" style="border-radius: 10px" src="https://i.ibb.co/gFMGMPRt/git-randbox-preview.gif">

🔗 **Demo en vivo:** [https://randbox.netlify.app/](https://randbox.netlify.app/)


## 📖 Acerca del proyecto


El proyecto nació como una __SPA desarrollada íntegramente con JavaScript vanilla__, y más adelante se incorporaron herramientas como __Vite__, __Page.js__ y __Flaticon__ para optimizar la carga, la navegación y los recursos visuales.

A pesar de estas adiciones, se mantuvo la filosofía de __no usar frameworks pesados__ como React, priorizando un código ligero y control total sobre la implementación.

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
Build de producción:

```bash
npm run build
npm run preview
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

## 🖥️ Secciones de la SPA

La aplicación consta de las siguientes vistas:

1. **Menu** – Navegación principal y configuración.
2. **Intro** – Primera etapa del juego.
3. **Quiz** –  Segunda etapa, cuestionario basado en la partida.
4. **Score** – Resultados y respuestas.
5. **About** – Créditos.

> Algunas rutas están restringidas y solo se desbloquean al completar etapas previas.

---


### 📂 Menu

Ruta: `/menu` o `/` (por defecto).

Permite acceder a todas las secciones y configurar la UI de la App.

#### Opciones de Menú

```
Options/
  ├── continuar partida # Activa modo pausa
  ├── boton menu        # Muestra el botón de menú
  ├── teclado           # Permite jugar con teclado (PC)
  ├── tutorial          # Guía inicial (solo una vez)
  ├── modo de juego/    # Configuraciones de partida
  | ├── child/
  | ├── normal/
  | ├── default/
  | └── custom          # Configuración manual avanzada
  ├── avanzado/
  | ├── velocidad       # Velocidad de animaciones (3 a 0.5 seg)
  | ├── vidas           # Vidas disponibles
  | ├── variedad        # Imágenes distintas mostradas
  | └── apariciones     # Total de imagenes mostradas
  └── limpiar cache     # Borrar la partida
```

#### Modos especiales
- **Pausa**: Permite detener el juego y reanudarlo desde la opción *Continuar*.
- **Tutorial**: Acceso directo a `/tutorial` desde `menu > help > como jugar?`.

---


## 🎯 Flujo del juego

### Intro

Ruta: `/intro` (requiere acceso desde menú o partida previa).

Primera parte del juego: preparación de la partida.  
> Al completarla, se desbloquea el *Quiz*.

---

### Quiz

Ruta: `/quiz` (requiere completar *Intro*).

Segunda parte: cuestionario basado en la partida.  
> Al completarlo, se desbloquea *Score*.

---

### Score

Ruta: `/score` (requiere completar *Quiz*).

Muestra el puntaje y todas las respuestas de la partida.

---



### 🌐 Rutas disponibles

| Ruta        | Descripción | Restricciones |
|-------------|-------------|--------------|
| `/`         | Menú principal (por defecto) | No |
| `/menu`     | Menú principal | No |
| `/tutorial` | Tutorial (`menu > help > como jugar?`) | No |
| `/options`  | Opciones del menú | No |
| `/intro`    | Primera parte del juego | Sí |
| `/quiz`     | Segunda parte del juego | Sí |
| `/score`    | Informacion de la partida | Sí |
| `/about`    | Créditos | No |





