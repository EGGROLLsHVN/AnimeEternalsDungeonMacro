import { BrowserWindow, ipcMain } from "electron";
import { updateUserSettings } from "./Actions/userSettingsChange.js";
import { loadSettings } from "./Actions/loadSettings.js";
import { startupSettings } from "./Actions/startupSettings.js";

export function startWindowHandlers(mainWindow: BrowserWindow) {
    ipcMain.on("user-setting-change", (_, settings) => {
        updateUserSettings(settings);
    });

    ipcMain.handle("load-settings", async (event) => {
        return loadSettings();
    });

    ipcMain.on('app-ready', () => {
        startupSettings();
    });

}
