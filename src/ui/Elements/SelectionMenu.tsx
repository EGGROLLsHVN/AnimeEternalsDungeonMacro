import { useEffect, useRef, useState } from "react";
import { useLogStore } from "../store";


export function Toggles() {
    const [settings, setSettings] = useState<userSettings>();
    const isFirstRender = useRef(true);

    const addLog = useLogStore((state: any) => state.addLog);

    // Gets data from my user .json file and stores it into data so my ui can read it
    useEffect(() => {
        const fetchData = async () => {
            let data = await window.electron.loadSettingsRenderer();
            
            setSettings(data);
            // console.log("Settings loaded!", data);
        };

        fetchData();
    }, []);

    // Updates my json file if its not the initial loadup and when setting is changed. Done this way instead of directly with changeUserSettingActionRender because
    // it is more consistent. When done other way I was having delay and problems with syncing my .json file

    useEffect(() => {
        if (!settings || isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        window.electron.changeUserSettingActionRenderer(settings);

    }, [settings]); 

    if (!settings) {
        return;
    }

    // Main method of switching dictionary of dungeon levels
    const toggleDungeon = (lvKey: string) => {
        setSettings((prevSettings: any) => ({
            ...prevSettings,
            w1dungeons: {
                ...prevSettings.w1dungeons,
                [lvKey]: !prevSettings.w1dungeons[lvKey]
            }
        }))
        
        addLog(`${lvKey.charAt(0).toUpperCase() + lvKey.slice(1)} dungeons are ${!settings.w1dungeons[lvKey as keyof typeof settings.w1dungeons] == true ? "enabled" : "disabled"}`)
    }

    return (
        <div className="toggles">
            <button className={`os ${settings.os == true ? "OS" : ""}`} 
            onClick={() => {
                // window.electron.changeUserSettingAction("OS")
            }}>MacOS | Windows (WIP)</button>

            <button className={`easy ${settings.w1dungeons.easy == true ? "buttonClicked" : ""}`} 
            onClick={() => {
                toggleDungeon("easy");
            }}>Easy</button>

            <button className={`medium ${settings.w1dungeons.medium == true ? "buttonClicked" : ""}`} 
            onClick={() => {
                toggleDungeon("medium");
            }}>Medium</button>

            <button className={`hard ${settings.w1dungeons.hard == true ? "buttonClicked" : ""}`} 
            onClick={() => {
                toggleDungeon("hard");
            }}>Hard</button>

            <button className={`insane ${settings.w1dungeons.insane == true ? "buttonClicked" : ""}`}
            onClick={() => {
                toggleDungeon("insane");
            }}>Insane</button>

            <button className={`crazy ${settings.w1dungeons.crazy == true ? "buttonClicked" : ""}`}
            onClick={() => {
                toggleDungeon("crazy");
            }}>Crazy</button>

            <button className={`nightmare ${settings.w1dungeons.nightmare == true ? "buttonClicked" : ""}`}
            onClick={() => {
                toggleDungeon("nightmare");
            }}>Nightmare</button>
            
        </div>
    )
}

export function SidePanel() {
    const [ssButton, setSSButton] = useState(false);

    const logs = useLogStore((state: any) => state.logs);
    const perf = useLogStore((state: any) => state.performance);
    const addLog = useLogStore((state: any) => state.addLog);

    const logTextArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (window.electron && window.electron.onNewLog) {
            
            const removeListener = window.electron.onNewLog((msg: string) => {
                addLog(msg); 
            });
            

            window.electron.sendAppReady();
            
            return () => {
            // Check if it's actually a function before calling
                if (typeof removeListener === 'function') {
                    removeListener();
                }
            };
        }
    }, [addLog]); 

    useEffect(() => {
        if (logTextArea.current) {
            logTextArea.current.scrollTop = logTextArea.current.scrollHeight;
        }
    }, [logs])


    return (
        <div className="sidePanel">
            <textarea className="logs" readOnly={true} placeholder=" Waiting to start... " value={logs} ref={logTextArea}></textarea>
            <textarea className="performance" readOnly={true} placeholder=" Waiting to start... " value={perf}></textarea>

            <div className="startStop">
                <button 
                    className={`ssButton ${ssButton == true ? "buttonClicked" : ""}`} 
                    onClick={() => {
                        setSSButton(!ssButton);

                        // If button is off turn on else turn off
                        if (!ssButton) {
                            
                        } else {

                        }
                        
                        }}>
                    Start/Stop
                </button>

                <textarea 
                    // name="keybinds" readOnly={true} 
                    // defaultValue={"Keybinds: WIP"}
                    > 
                </textarea>

            </div>
        </div>
    )
}

