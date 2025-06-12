const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribestatistics: (callback: (statistics: any) => void) => callback({}),
  getStaticData: () => console.log("Static data"),
});
