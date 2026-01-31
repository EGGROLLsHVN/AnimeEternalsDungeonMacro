import { getWindow } from "../windowManager.js";
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from "../main.js";
import { isDev } from "../util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pythonProcess: ChildProcess | null = null; // Store the process globally

export function startMacro() {
    log("Starting macro")

    let mainWindow = getWindow();
    let scriptPath: string;

    if (isDev()) {
        scriptPath = path.join(process.cwd(), 'src', 'python', 'runner.py');    
        
    } else {
        scriptPath = path.join(process.resourcesPath, 'python', 'runner.py');
    }
    
    const pythonExecutable = "python";
    // const scriptPath = path.join(__dirname, 'runner.py');
    
    // Spawn the process
    pythonProcess = spawn(pythonExecutable, ['-u', scriptPath]);

    if (pythonProcess.stdout) {
        pythonProcess.stdout.on('data', (data) => {
            const message = data.toString().trim();
            log(`[Python]: ${message}`);
            console.log(`[Python]: ${message}`);
        })
    }

    if (pythonProcess.stderr) {
        pythonProcess.stderr.on('data', (data) => {
            const error = data.toString().trim();
            console.error(`[Python Error]: ${error}`);
            log(`[Python Error]: ${error}`);
        });
    }

    pythonProcess.on('close', () => {
        pythonProcess = null; 
    });

    return;
}

export function stopMacro() {
    log("Stopping macro")

    if (pythonProcess) {
        pythonProcess.kill(); 
        pythonProcess = null;
    }
}