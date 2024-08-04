const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFolder: () => ipcRenderer.invoke('open-folder-dialog'),
  readDir: (path) => ipcRenderer.invoke('read-dir', path),
  setFullScreen: () => ipcRenderer.send('folder-selected'),
  resetWindowSize: () => ipcRenderer.send('reset-window-size'),
});