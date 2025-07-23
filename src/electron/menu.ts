import { app, BrowserWindow, Menu } from "electron/main";
import { isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        // Mac bydefault will call it electron (app name) so setting it is not recommended as it does nothing
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            click: () =>
              mainWindow.webContents.send("subscribeView", "cpuUsage"),
          },
          {
            label: "RAM",
            click: () =>
              mainWindow.webContents.send("subscribeView", "ramUsage"),
          },
          {
            label: "STORAGE",
            click: () =>
              mainWindow.webContents.send("subscribeView", "storageUsage"),
          },
        ],
      },
      {
        label: "DevTools",
        click: () => mainWindow.webContents.openDevTools(),
        visible: isDev(),
      },
    ])
  );
}
