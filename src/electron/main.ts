import { app, BrowserWindow } from "electron";
import path from "path";
import { ipcHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  pollResources(mainWindow);
  // ipcMain.handle("getStaticData", () => getStaticData());

  ipcHandle("getStaticData", () => getStaticData());

  // handleGetStaticData(() => getStaticData());
});

// const handleGetStaticData = (callback: () => StaticData) => {
//   ipcMain.handle("getStaticData", () => callback());
// };
