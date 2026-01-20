import { create } from 'zustand'

interface LogStore {
  logs: string;
  performance: string;
  addLog: (msg: string) => void;
  updatePerf: (stats: string) => void;
}

export const useLogStore = create<LogStore>((set) => ({
    logs: "",
    performance: "Waiting...",

    addLog: (msg) => set((state) => ({
        logs: state.logs + `[${new Date().toLocaleTimeString()}] ${msg}\n`
    })),

    updatePerf: (stats) => set({performance: stats}),

}))
