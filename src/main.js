const path = require('path')
const { app, BrowserWindow, systemPreferences, ipcMain } = require('electron')

let mainWindow

// Keep a reference for dev mode
let isDev = false
if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  isDev = true
}

const width = 550
const height = 380

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    // maxWidth: width,
    // maxHeight: height,
    acceptFirstMouse: true,
    titleBarStyle: 'hiddenInset',
    fullscreenWindowTitle: true,
    backgroundColor: '#141414',
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../dist/index.html')}`
  )

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer')

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => {
        console.log(`Added Extension: ${name}`) // eslint-disable-line no-console
      })
      .catch(err => {
        console.log('An error occurred: ', err) // eslint-disable-line no-console
      })
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  //
  // Events
  //
  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.add(\'fullscreen\')'
    )
  })

  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.remove(\'fullscreen\')'
    )
  })

  mainWindow.on('blur', () => {
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.add(\'blur\')'
    )
  })

  mainWindow.on('focus', () => {
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.remove(\'blur\')'
    )
  })

  // Make window bigger automatically when devtools are opened
  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.setSize(1024, 420, true)
  })

  mainWindow.webContents.on('devtools-closed', () => {
    mainWindow.setSize(width, height, true)
  })

  // Load menubar menu items
  require('./menu.js')
}

app.on('ready', () => {
  createWindow()

  // Switch to user theme on start, and on reload
  mainWindow.webContents.on('dom-ready', () => switchTheme())
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const switchTheme = () => {
  if (systemPreferences.isDarkMode()) {
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.add(\'dark\')'
    )
  } else {
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.remove(\'dark\')'
    )
  }
}

// Listen for theme changes in System Preferences
systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  () => switchTheme()
)
