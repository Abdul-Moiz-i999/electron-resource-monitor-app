import { app, BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import {
  getStaticData,
  startPollResources,
  stopPolling,
} from "./resourceManager.js";
import { createTray } from "./tray.js";
import { ipcHandle, isDev } from "./util.js";
import { createMenu } from "./menu.js";
import { ipcMain } from "electron/main";

// Enabling this line and disabling createMenu function will disable default app menu
// Menu.setApplicationMenu(null);
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }
  ipcMain.on("startPolling", () => {
    startPollResources(mainWindow);
  });

  ipcMain.on("stopPolling", () => {
    stopPolling();
  });

  // ipcMain.handle("getStaticData", () => getStaticData());

  ipcHandle("getStaticData", () => getStaticData());

  // handleGetStaticData(() => getStaticData());
  createMenu(mainWindow);
  handleCloseButton(mainWindow);
});

let closeApp = false;
function handleCloseButton(mainWindow: BrowserWindow) {
  mainWindow.on("close", (e) => {
    if (closeApp) {
      return;
    }
    e.preventDefault();
    const tray = createTray(mainWindow);
    console.log("Createing tray again: ", closeApp);
    mainWindow.hide();

    if (app.dock) {
      app.dock.hide();
    }

    app.on("before-quit", () => {
      console.log("before-quit called");
      tray?.destroy();
      closeApp = true;
    });

    mainWindow.on("show", () => {
      console.log("show called");
      closeApp = false;
    });
  });
}

// const handleGetStaticData = (callback: () => StaticData) => {
//   ipcMain.handle("getStaticData", () => callback());
// };
