import { ipcMain, WebContents, WebFrameMain } from "electron/main";
import { pathToFileURL } from "url";
import { getUIPath } from "./pathResolver.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

export function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  data: EventPayloadMapping[Key]
) {
  webContents.send(key, data);
}

export function ipcOnWithPayload<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: HeaderAction) => void
) {
  ipcMain.on(key, (event, payload: HeaderAction) => {
    validateEventFrame(event.senderFrame);
    return handler(payload);
  });
}

export function ipcOnWithoutPayload<Key extends keyof EventMapping>(
  key: Key,
  handler: () => void
) {
  ipcMain.on(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

export function validateEventFrame(frame: WebFrameMain | null) {
  if (!frame) throw new Error("Wrong Event");
  else if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  } else if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious Event");
  }
}
