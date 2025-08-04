import { ipcRenderer } from "electron";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeView: (callback: (view: any) => void) => {
    return ipcOn("subscribeView", callback);
  },
  sendHeaderAction: (payload: HeaderAction) => {
    ipcSendWithPayload("sendHeaderAction", payload);
  },
  // startPolling: () => ipcSendWithoutPayload("startPolling"),
  // stopPolling: () => ipcSendWithoutPayload("stopPolling"),
  subscribeStatistics: (callback: (statistics: any) => void) => {
    return ipcOn("statistics", callback);
  },
  getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

function ipcSendWithPayload<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: HeaderAction
) {
  ipcRenderer.send(key, payload);
}

function ipcSendWithoutPayload<Key extends keyof EventMapping>(key: Key) {
  ipcRenderer.send(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: any, payload: EventPayloadMapping[Key]) => callback(payload);
  ipcSendWithoutPayload("startPolling");
  electron.ipcRenderer.on(key, cb);
  return () => {
    electron.ipcRenderer.off(key, cb);
    ipcSendWithoutPayload("stopPolling");
  };
}

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key);
}
