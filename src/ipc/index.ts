import { ipcRenderer } from 'electron';
import getProxiesIPC from './getProxiesIPC';

export default function IPCInitialization() {
  ipcRenderer.on('getProxies', getProxiesIPC);
}
