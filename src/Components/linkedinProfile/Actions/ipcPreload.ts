const loadPage = (webView: Electron.WebviewTag, newUrl: string) =>
  webView.send('loadPage', newUrl);

const loadLinkedinHomePage = (webView: Electron.WebviewTag) =>
  webView.send('loadLinkedinHomePage');

const login = (webView: Electron.WebviewTag, email: string, password: string) =>
  webView.send('login', email, password);

export { loadPage, loadLinkedinHomePage, login };
