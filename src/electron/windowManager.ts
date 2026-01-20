import { BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;

export function setWindow(window: BrowserWindow) {
    mainWindow = window;

}

export function sendToFrontend(code: string, data: any) {
    if (mainWindow && !mainWindow.isDestroyed()) {
        // console.log(`Sending ${data}`)
        mainWindow.webContents.send(code, data);

    } else {
        console.warn("Window is closed and cannot be accessed.")
    }
}

export function getWindow() {
    return mainWindow;
}
