import { notification } from 'antd';
import { ipcRenderer } from 'electron';
import getProxiesIPC from './getProxiesIPC';

export default function IPCInitialization() {
  ipcRenderer.on('getProxies', getProxiesIPC);
  ipcRenderer.on('error', (e, ...args) => {
    console.log(args);
    notification.error({ message: args[0], description: args[1] });
  });
}
