import { app, BrowserWindow, Tray } from "electron";
import { ipcHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import path from "path";

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
  new Tray(path.join(getAssetsPath(), "tray-icon.png"));
  handleCloseButton(mainWindow);
});

function handleCloseButton(mainWindow: BrowserWindow) {
  mainWindow.on("close", (e) => {
    let closeApp = false;
    if (closeApp) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();

    if (app.dock) {
      app.dock.hide();
    }

    app.on("before-quit", () => {
      closeApp = true;
    });

    mainWindow.on("show", () => {
      closeApp = false;
    });
  });
}

// const handleGetStaticData = (callback: () => StaticData) => {
//   ipcMain.handle("getStaticData", () => callback());
// };
