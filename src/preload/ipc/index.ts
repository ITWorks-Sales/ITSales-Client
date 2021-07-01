import loadPageICP from './loadPage';

export default function IPCInitialization() {
  window.ipcRenderer.on('loadPage', loadPageICP);
}
