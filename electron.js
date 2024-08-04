import { app, BrowserWindow, ipcMain, dialog, protocol } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    mainWindow.loadURL('http://localhost:5173');
  }
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('safe-file', (request, callback) => {
    const url = request.url.replace(/^safe-file:\/\//, '')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      console.error(error)
    }
  });

  createWindow();

  ipcMain.on('folder-selected', () => {
    mainWindow.setFullScreen(true);
  });

  ipcMain.on('reset-window-size', () => {
    mainWindow.setFullScreen(false);
    mainWindow.setSize(800, 800);
    mainWindow.center();
  });

  protocol.registerFileProtocol('safe-file', (request, callback) => {
    const url = request.url.replace(/^safe-file:\/\//, '')
    try {
      return callback(decodeURIComponent(url))
    } catch (error) {
      console.error(error)
    }
  });

  ipcMain.handle('open-folder-dialog', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    return result.filePaths[0]
  });

  ipcMain.handle('read-dir', async (_, folderPath) => {
    try {
      const contents = await fs.readdir(folderPath, { withFileTypes: true })
      return contents.map(dirent => ({
        name: dirent.name,
        type: dirent.isDirectory() ? 'directory' : 'file'
      }))
    } catch (error) {
      console.error('Error reading directory:', error)
      throw error
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});