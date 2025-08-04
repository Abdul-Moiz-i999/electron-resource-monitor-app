/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, Mock, test, vi } from "vitest";
import { createTray } from "./tray.js";
import { app, BrowserWindow, Menu } from "electron/main";

vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
      setToolTip: vi.fn(),
      destroy: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
      quit: vi.fn(),
      dock: {
        show: vi.fn,
      },
    },
    Menu: {
      buildFromTemplate: vi.fn(),
    },
  };
});

const mainWindow = {
  show: vi.fn(),
} satisfies Partial<BrowserWindow> as any as BrowserWindow;

test("Check tray", () => {
  createTray(mainWindow);
  const calls = (Menu.buildFromTemplate as any as Mock).mock.calls;
  const args = calls[0] as Parameters<typeof Menu.buildFromTemplate>;
  const template = args[0];
  expect(template).toHaveLength(2);
  template[0].click?.(null as any, null as any, null as any);
  expect(mainWindow.show).toHaveBeenCalled();
  //   expect(Menu.buildFromTemplate).toHaveBeenCalled();
  template[1].click?.(null as any, null as any, null as any);
  expect(app.quit).toHaveBeenCalled();
});

// test("check tray 2", () => {});
