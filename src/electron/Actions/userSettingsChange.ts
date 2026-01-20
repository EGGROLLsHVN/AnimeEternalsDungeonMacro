import { app } from 'electron';
import path from 'path';
import fs from 'fs';

import { defaultConfig } from "../defaultConfig.js";
import { log } from '../main.js';

export function updateUserSettings(settings: string) {
    let folderPath = path.dirname(app.getPath('exe'));
        
    if (process.platform === 'darwin') {
        folderPath = path.resolve(folderPath, '../../..');
    }

    const filePath = path.join(folderPath, 'user-settings.json');

    if (!fs.existsSync(filePath)) {
        log("Settings doesn't exist... Creating new settings");
        
        fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2)); 
    }

    fs.writeFileSync(filePath, JSON.stringify(settings, null, 2));

}
