import { app, BrowserWindow, Menu, Tray } from "electron/main";
import { getAssetsPath } from "./pathResolver.js";
import path from "path";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssetsPath(), "tray-icon.png"));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
          app.dock?.show();
          tray?.destroy();
        },
      },
      {
        label: "Quit",
        click: () => {
          console.log("TRAY:", tray);
          app.quit();
          tray?.destroy();
        },
      },
      //   {
      //     label: "submenu",
      //     submenu: [
      //       {
      //         label: "1",
      //         type: "radio",
      //       },
      //       {
      //         label: "2",
      //         type: "radio",
      //       },
      //     ],
      //   },
    ])
  );
}
