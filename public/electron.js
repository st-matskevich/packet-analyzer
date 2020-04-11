const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev');

function createWindow() {
    // Create the browser window.     
    win = new BrowserWindow({
        width: 900,
        height: 680,
        title: 'Packet Analyazer',
        frame: false,
        minHeight: 300,
        minWidth: 300,
        webPreferences: {
            preload: path.join(__dirname, '../build/preload.js'),
        }
    })

    win.loadURL(isDev ?
        'http://localhost:3000' :
        `file://${path.join(__dirname, '../build/index.html')}`
    );
}
app.on('ready', createWindow)