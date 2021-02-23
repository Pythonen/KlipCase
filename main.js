// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray } = require("electron");

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.hide();
  tray = new Tray("./briefcase.png");

  // show tray when clicked on
  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  mainWindow.on("show", () => {
    // tray.setHighlightMode('always');
    const bounds = tray.getBounds();
    let y = 0;
    let x = bounds.x;
    if (process.platform !== "darwin") {
      const size = mainWindow.getSize();
      const windowHeight = size[1];
      if (bounds.y === 0) {
        // windows taskbar top
        y = bounds.height;
      } else {
        // windows taskbar bottom
        y = bounds.y - windowHeight;
      }
    }
    mainWindow.setPosition(x, y);
  });

  mainWindow.on("hide", () => {
    // tray.setHighlightMode('never');
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.on("blur", () => {
    mainWindow.hide();
  });
}

app.on("ready", createWindow);

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
