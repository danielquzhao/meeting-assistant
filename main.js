const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Set window to always on top
  win.setAlwaysOnTop(true, 'floating');
  
  // Make window visible on all workspaces/spaces
  win.setVisibleOnAllWorkspaces(true, {visibleOnFullScreen: true});
  
  // Make window click-through (optional)
  win.setIgnoreMouseEvents(true);

  // Hide from screen capture (Google Meet, etc.)
  win.setContentProtection(true);
  
  win.loadFile('index.html');
  
  return win;
}

app.whenReady().then(() => {
  const win = createWindow();
  
  // Register global shortcuts
  globalShortcut.register('CommandOrControl+Right', () => {
    const [x, y] = win.getPosition();
    win.setPosition(x + 50, y);
  });
  
  globalShortcut.register('CommandOrControl+Left', () => {
    const [x, y] = win.getPosition();
    win.setPosition(x - 50, y);
  });
});

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
