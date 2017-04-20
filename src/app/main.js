const electron = require('electron')
//require('electron-reload')(process.cwd() + '/dist');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

//require('electron-debug')({showDevTools: false})

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
//var client = require('electron-connect').client;


function createWindow () {

  var Positioner = require('electron-positioner')

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 1000,
    "node-integration": "iframe", // and this line
    "web-preferences": {
      "web-security": false
    }
  })

  var positioner = new Positioner(mainWindow)

  mainWindow.loadURL(url.format({
    pathname: process.cwd() + '/dist/index.html',
    protocol: 'file:',
    slashes: false
  }))


  //positioner.move('trayLeft',mainWindow.getBounds())
  positioner.move('topLeft') //

  // Connect to server process
  //client.create(mainWindow);

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null

  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') {
    app.quit()
  }

})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {

    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.