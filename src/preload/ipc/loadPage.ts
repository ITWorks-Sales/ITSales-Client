import Electron from 'electron';
import LoadPage from '../actions/loadPage';
export default function loadPageICP(
  _: Electron.IpcRendererEvent,
  newURL: string
) {
  LoadPage(newURL);
}
