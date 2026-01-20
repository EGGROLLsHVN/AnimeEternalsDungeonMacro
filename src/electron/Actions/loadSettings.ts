import path from 'path';
import { app } from 'electron';
import fs from 'fs';

export function loadSettings() {
    let folderPath = path.dirname(app.getPath('exe'));

    if (process.platform === 'darwin') {
        folderPath = path.resolve(folderPath, '../../..');
    }

    const filePath = path.join(folderPath, 'user-settings.json');

    const fileData = fs.readFileSync(filePath, 'utf-8')
    const settings = JSON.parse(fileData)

    return settings;
}