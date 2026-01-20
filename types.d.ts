type userSettings = {
    configVersion: number,
    os: boolean,
    w1dungeons: {
        easy: boolean,
        medium: boolean,
        hard: boolean,
        insane: boolean,
        crazy: boolean,
        nightmare: boolean
    }
}

interface Window {
    electron: {
        loadSettingsRenderer(): Promise<userSettings>;
        changeUserSettingActionRenderer: (payload: userSettings) => void;
        onNewLog: (callback: (message: string) => void) => () => void;
        sendAppReady: () => void;
        startMacroRenderer: () => void,
        stopMacroRenderer: () => void,

    }
}


