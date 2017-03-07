const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 850,
        minWidth: 850,
        height: 440,
        //frame: false,
        center: true,
        autoHideMenuBar: true,
        //transparent: true,
        show: false
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, './render.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.once('ready-to-show', () => {
        win.show();
    });
    //win.setMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});