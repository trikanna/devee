const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let environment = process.env.ELECTRON_ENV

console.log("----------", environment)

if (environment === 'development') {
    require('electron-reload')(`${__dirname}/src/`);
}

let mainWindow

function createWindow () {

    mainWindow = new BrowserWindow({
        width: 460,
        height: 240,
        x: 40,
        y: 50,
        backgroundColor: '#e7e7e7',
        titleBarStyle: 'default',
        maximizable: false,
        resizable: false,
        title: 'TimeMachineEditor'
    })

    mainWindow.loadURL(`file://${__dirname}/src/index.html`)

    if (environment === 'development') {
        mainWindow.webContents.openDevTools({'mode' : 'detach'})
        // mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', function () { mainWindow = null })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
