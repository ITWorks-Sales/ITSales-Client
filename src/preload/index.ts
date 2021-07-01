import { ipcRenderer } from 'electron';
import IPCInitialization from './ipc';
declare global {
  interface Window {
    ipcRenderer: Electron.IpcRenderer;
  }
}
window.ipcRenderer = ipcRenderer;
IPCInitialization();

console.log(33);

console.log(33);

export {};
