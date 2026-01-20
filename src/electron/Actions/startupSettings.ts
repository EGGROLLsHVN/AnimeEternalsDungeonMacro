import { app, BrowserWindow, webContents } from 'electron';
import path from 'path';
import fs from 'fs';

import { defaultConfig } from "../defaultConfig.js";
import { log } from '../main.js';

export function startupSettings() {

    let folderPath = path.dirname(app.getPath('exe'));

    if (process.platform === 'darwin') {
        folderPath = path.resolve(folderPath, '../../..');
    }

    const filePath = path.join(folderPath, 'user-settings.json');

    if (!fs.existsSync(filePath)) {
        log("Creating default settings...");
        log(`Saving 'user-settings.json' to: ${filePath}`);
        
        fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2)); 
    
        log("Settings created successfully.");
    } else {
        const fileData = fs.readFileSync(filePath, 'utf-8')
        const currentUserSettings = JSON.parse(fileData)

        log("Settings have already been loaded.");
        log("Checking if config settings have been updated by developer.");
        
        if (defaultConfig.configVersion !== currentUserSettings.configVersion) {
            fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2));
            log("Settings were changed and updated.");
        } else {
            log("No settings were changed.");
        }
    }
}

