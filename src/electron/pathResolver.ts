import { app } from "electron";
import path from "path";
import { isDev } from "./util.js";

export const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
};

export const getUIPath = () =>
  path.join(app.getAppPath(), "/dist-react/index.html");

export const getAssetsPath = () =>
  path.join(app.getAppPath(), isDev() ? "." : "..", "src/assets");
