import { getProxies } from '../api/proxy';

export default async function getProxiesIPC(event: Electron.IpcRendererEvent) {
  const { data: proxyList } = await getProxies();
  event.sender.send('getProxies-reply', proxyList);
}
