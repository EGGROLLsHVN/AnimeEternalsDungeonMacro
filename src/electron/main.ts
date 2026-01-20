import {app, BrowserWindow, ipcMain, Menu, screen} from "electron"
import path from "path"
import { isDev } from "./util.js";
import { startWindowHandlers } from "./ipcHandlers.js";
import { sendToFrontend, setWindow } from "./windowManager.js";

app.commandLine.appendSwitch('log-level', '3');
app.commandLine.appendSwitch('disable-features', 'Autofill');
Menu.setApplicationMenu(null);

export function log(message: string) {
    sendToFrontend("new-log", message); 
}

app.on("ready", () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const {width, height } = primaryDisplay.workAreaSize;

    const windowWidth = Math.floor(width * 0.5);
    const windowHeight = Math.floor(height * 0.5);

    const mainWindow = new BrowserWindow({
        
        width: windowWidth, 
        height: windowHeight,
        fullscreenable: false,
        resizable: false,

        webPreferences: {
            preload: getPreloadPath(),
        }

    });

    setWindow(mainWindow);

    startWindowHandlers(mainWindow);

    if (isDev()) {
        mainWindow.loadURL('http://localhost:8888/');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
        
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
})


// Path resolver foor if we are in dev()
function getPreloadPath() {
    return path.join (
        app.getAppPath(),
        isDev() ? '.' : '..',
        '/dist-electron/preload.cjs'
    )
}