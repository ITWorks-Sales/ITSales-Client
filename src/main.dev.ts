/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, Menu, MenuItem, clipboard } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

import { ipcMain } from 'electron';

import MenuBuilder from './menu';
import { ILIProfile, IProxy } from './api/types';
import { PopupOptions, session } from 'electron/main';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

let profileWindows: { [key: number]: BrowserWindow } = {};

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const getAssetPath = (...paths: string[]): string => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');
  return path.join(RESOURCES_PATH, ...paths);
};

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    icon: getAssetPath('icon.png'),
    title: 'Linkedin Client - Main Window',
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on('createNewWindow', async (_, args) => {
  const { id, email, proxy }: ILIProfile = args.profile;
  let window = new BrowserWindow({
    width: 1800,
    height: 1200,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
  });

  profileWindows[id] = window;

  await window.loadURL(`file://${__dirname}/index.html#/linkedinProfile/${id}`);
  window.setTitle(`Linekdin Profile - ${email}`);
  const webViewSession = session.fromPartition(`persist:${id}`);
  if (proxy) {
    webViewSession.setProxy({
      proxyRules: `http://${proxy.ip}`,
    });
  }
});

ipcMain.on('setWindowTitle', (_, args: { id: number; title: string }) => {
  const { id, title } = args;
  profileWindows[id].setTitle(title);
});

app.on('login', async (event, _, __, authInfo, callback) => {
  event.preventDefault();
  if (!mainWindow) return;
  if (authInfo.isProxy) {
    mainWindow.webContents.send('getProxies');
    ipcMain.once('getProxies-reply', (_, proxyList: IProxy[]) => {
      console.log(proxyList);
      const { login, password } = proxyList.find((proxy) =>
        proxy.ip.includes(authInfo.host)
      ) as IProxy;
      console.log(login, password);
      callback(login, password);
    });
  }
});

//MENU

app.on('web-contents-created', (_, contents) => {
  if (contents.getType() == 'webview') {
    contents.on('context-menu', (_, data) => {
      const { linkURL, mediaType, linkText } = data;
      if (linkURL) {
        const copyLink = new MenuItem({
          id: 'copyLink',
          label: 'Copy Link',
          visible: linkURL.length > 0 && mediaType === 'none',
          click: () => {
            clipboard.write({
              bookmark: linkText,
              text: linkURL,
            });
          },
        });
        const menu = new Menu();
        menu.insert(0, copyLink);
        menu.popup(contents as PopupOptions);
      }
    });
  }
});
