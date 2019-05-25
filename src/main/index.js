const path = require('path')
const { app, BrowserWindow, systemPreferences, ipcMain } = require('electron')
const pkg = require('../../package.json')
const buildMenu = require('./menu')
const { buildTouchbar, updateTouchbar } = require('./touchbar')
const { rgbaToHex } = require('../utils')

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

const width = 620
const height = 440

const createWindow = async () => {
  const isDarkMode = systemPreferences.isDarkMode()

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    acceptFirstMouse: true,
    titleBarStyle: 'hiddenInset',
    fullscreenWindowTitle: true,
    backgroundColor: isDarkMode ? '#141414' : '#fff',
    frame: false,
    show: false,
    title: pkg.productName,
    webPreferences: {
      nodeIntegration: true,
      scrollBounce: true
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../../build/index.html')}`
  )

  createWindowEvents(mainWindow)
  installDevTools(mainWindow)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Load menubar
  buildMenu(mainWindow)
  // Load touchbar
  if (process.platform === 'darwin') {
    const accentColor = getAccentColor()
    buildTouchbar(mainWindow, accentColor)

    ipcMain.on('prices-updated', (event, pricesNew) => {
      updateTouchbar(pricesNew, mainWindow, accentColor)
    })

    ipcMain.on('currency-updated', (event, pricesNew, currentCurrency) => {
      updateTouchbar(pricesNew, mainWindow, accentColor, currentCurrency)
    })
  }
}

app.on('ready', () => {
  createWindow()

  mainWindow.webContents.on('dom-ready', () => {
    switchTheme()
    switchAccentColor()
  })
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

const installDevTools = async mainWindow => {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer')

    try {
      const name = await installExtension(REACT_DEVELOPER_TOOLS)
      console.log(`Added Extension: ${name}`) // eslint-disable-line no-console

      mainWindow.webContents.on('devtools-opened', () =>
        mainWindow.setSize(1024, 420, true)
      )
      mainWindow.webContents.on('devtools-closed', () =>
        mainWindow.setSize(width, height, true)
      )
    } catch (error) {
      console.log('An error occurred: ', error) // eslint-disable-line no-console
    }
  }
}

const createWindowEvents = mainWindow => {
  mainWindow.on('enter-full-screen', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.add(\'fullscreen\')'
    )
  )
  mainWindow.on('leave-full-screen', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.remove(\'fullscreen\')'
    )
  )
  mainWindow.on('blur', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.add(\'blur\')'
    )
  )
  mainWindow.on('focus', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName(\'html\')[0].classList.remove(\'blur\')'
    )
  )
}

//
// Accent color setting
// macOS & Windows
//
const getAccentColor = () => {
  const systemAccentColor = systemPreferences.getAccentColor()
  return rgbaToHex(systemAccentColor)
}

const switchAccentColor = () => {
  const accentColor = getAccentColor()
  mainWindow.webContents.send('accent-color', accentColor)
}

// Listen for accent color changes in System Preferences
// macOS
systemPreferences.subscribeNotification('AppleAquaColorVariantChanged', () =>
  switchAccentColor()
)
// Windows
systemPreferences.on('accent-color-changed', () => switchAccentColor())

//
// Appearance setting
// macOS
//
const switchTheme = () => {
  const isDarkMode = systemPreferences.isDarkMode()

  isDarkMode
    ? mainWindow.webContents.executeJavaScript(
        'document.getElementsByTagName(\'html\')[0].classList.add(\'dark\')'
      )
    : mainWindow.webContents.executeJavaScript(
        'document.getElementsByTagName(\'html\')[0].classList.remove(\'dark\')'
      )
}

// Listen for appearance changes in System Preferences
systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  () => switchTheme()
)
