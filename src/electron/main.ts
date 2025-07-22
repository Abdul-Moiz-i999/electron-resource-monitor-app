import { app, BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { createTray } from "./tray.js";
import { ipcHandle, isDev } from "./util.js";

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
  pollResources(mainWindow);
  // ipcMain.handle("getStaticData", () => getStaticData());

  ipcHandle("getStaticData", () => getStaticData());

  // handleGetStaticData(() => getStaticData());
  handleCloseButton(mainWindow);
});
let closeApp = false;
function handleCloseButton(mainWindow: BrowserWindow) {
  mainWindow.on("close", (e) => {
    if (closeApp) {
      return;
    }
    e.preventDefault();
    createTray(mainWindow);
    console.log("Createing tray again: ", closeApp);
    mainWindow.hide();

    if (app.dock) {
      app.dock.hide();
    }

    app.on("before-quit", () => {
      console.log("before-quit called");
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
