import { ipcRenderer } from "electron"
const electron = require("electron")

electron.contextBridge.exposeInMainWorld("electron", {
    changeUserSettingActionRenderer: (settings: string) => {electron.ipcRenderer.send("user-setting-change", settings)},
    loadSettingsRenderer: () => electron.ipcRenderer.invoke("load-settings"),
    sendAppReady: () => electron.ipcRenderer.send('app-ready'),
    // newLogRenderer: () 
    onNewLog: (callback: (message: string) => void) => {
        const subscription = (_event: any, message: string) => callback(message);

        ipcRenderer.on('new-log', subscription);

        // Allows the frontend to call removeListener()
        return () => {
            ipcRenderer.removeListener('new-log', subscription);
        };
    },

    startMacroRenderer: () => electron.ipcRenderer.send('start-macro'),
    stopMacroRenderer: () => electron.ipcRenderer.send('stop-macro'),

})