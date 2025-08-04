import { test, expect, _electron } from "@playwright/test";

async function waitForPreloadScript() {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const electronBridge = await mainPage.evaluate(() => {
        return (window as Window & { electron?: any }).electron;
      });
      if (electronBridge) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
}

let electronApp: Awaited<ReturnType<typeof _electron.launch>>;
let mainPage: Awaited<ReturnType<typeof electronApp.firstWindow>>;
test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ["."],
    env: { NODE_ENV: "development" },
  });
  mainPage = await electronApp.firstWindow();
  await waitForPreloadScript();
});

test.afterEach(async () => {
  await electronApp.evaluate(async ({ app }) => {
    app.quit();
  });
});

test("custom frame should minimize the main window", async () => {
  await mainPage.click("#minimize");
  const isMinimized = await electronApp.evaluate((electron) =>
    electron.BrowserWindow.getAllWindows()[0].isMinimized()
  );
  expect(isMinimized).toBeTruthy();
});

test("should create a custom menu", async () => {
  const menu = await electronApp.evaluate((electron) =>
    electron.Menu.getApplicationMenu()
  );

  expect(menu).not.toBeNull();
  const items = menu?.items || [];
  expect(items).toHaveLength(3);
  expect(items[0].submenu?.items).toHaveLength(1);
  expect(items[1].submenu?.items).toHaveLength(3);
  expect(items[1].label).toBe("View");
});
