import MenuApp from "./MenuUI.js";
import menuControls from "./componentes/controls.js";
import menuHelp from "./componentes/help.js";
import menuMain from "./componentes/main.js";
import menuOptions from "./componentes/options.js";
import menuTutorial from "./componentes/tutorial.js";

const Menu = () => {
  const menu = new MenuApp();
  menu.createMenu({
      name: "main-menu",
      estado: "main-menu-active",
      render: menuMain, children: [
        { name: "continue", estado: "continue-menu-active" },
        { name: "play", estado: "play-game" },
        { name: "options", estado: "options-menu-active", render: menuOptions },
        { name: "help", estado: "help-menu-active", render: menuHelp, 
          children: [
            {name: "tutorial",estado: "resumen-submenu-active",render: menuTutorial},
            {name: "controls",estado: "controls-submenu-active",render: menuControls},
          ],
        },
      ],
  });
  return menu
}

export default Menu()