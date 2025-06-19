const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    // electron.ipcRenderer.on("statistics", (_: any, stats: any) => {
    //   callback(stats);
    // });
    ipcOn("statistics", callback);
  },
  // getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (_: any, payload: EventPayloadMapping[Key]) => {
    callback(payload);
  });
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}
