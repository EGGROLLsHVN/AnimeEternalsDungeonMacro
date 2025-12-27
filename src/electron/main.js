import {app, BrowserWindow} from "electron"
import path from "path"


app.on("ready", () => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const {width, height } = primaryDisplay.workAreaSize;

    const windowWidth = Math.floor(width * 0.6);
    const windowHeight = Math.floor(height * 0.6);

    const mainWindow = new BrowserWindow({
        
        width: windowWidth, 
        height: windowHeight,
    //     fullscreenable: false,
    //     resizable: false,

    //     webPreferences: {
    //         preload: getPreloadPath(),
    //     }

    });

    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index/.html'));

})

dih