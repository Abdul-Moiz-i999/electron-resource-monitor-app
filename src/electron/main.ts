import { app, BrowserWindow } from "electron";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import {
  getStaticData,
  startPollResources,
  stopPolling,
} from "./resourceManager.js";
import { createTray } from "./tray.js";
import {
  ipcHandle,
  ipcOnWithoutPayload,
  ipcOnWithPayload,
  isDev,
} from "./util.js";
import { createMenu } from "./menu.js";

// Enabling this line and disabling createMenu function will disable default app menu
// Menu.setApplicationMenu(null);
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 550,
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  ipcOnWithPayload("sendHeaderAction", (payload: HeaderAction) => {
    switch (payload) {
      case "MINIMIZE":
        mainWindow.minimize();
        break;
      case "MAXIMIZE":
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case "CLOSE":
        mainWindow.close();
        break;
    }
  });

  ipcOnWithoutPayload("startPolling", () => {
    startPollResources(mainWindow);
  });

  ipcOnWithoutPayload("stopPolling", () => {
    stopPolling();
  });

  ipcHandle("getStaticData", () => getStaticData());

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
    mainWindow.hide();

    if (app.dock) {
      app.dock.hide();
    }

    app.on("before-quit", () => {
      tray?.destroy();
      closeApp = true;
    });

    mainWindow.on("show", () => {
      closeApp = false;
    });
  });
}
