const path = require('path')
const {
  app,
  BrowserWindow,
  systemPreferences,
  nativeTheme,
  ipcMain
} = require('electron')
const prepareNext = require('electron-next')
const isDev = require('electron-is-dev')
const pkg = require('../../package.json')
const buildMenu = require('./menu')
const { buildTouchbar, updateTouchbar } = require('./touchbar')
const { rgbaToHex } = require('../utils')

let mainWindow

const width = 640
const height = 450

const createWindow = async () => {
  const isDarkMode = nativeTheme.shouldUseDarkColors

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: width,
    minHeight: height,
    acceptFirstMouse: true,
    titleBarStyle: 'hiddenInset',
    fullscreenWindowTitle: true,
    backgroundColor: isDarkMode ? '#141414' : '#fff',
    frame: process.platform === 'darwin' ? false : true,
    show: false,
    title: pkg.productName,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      scrollBounce: true,
      enableBlinkFeatures: 'OverlayScrollbars'
    }
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:8000'
      : `file://${path.join(__dirname, '../renderer/out/index.html')}`
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

  // Load menu
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

app.on('ready', async () => {
  await prepareNext('./src/renderer')
  await createWindow()

  mainWindow.webContents.on('dom-ready', () => {
    switchTheme()

    // add platform as class
    mainWindow.webContents.executeJavaScript(
      `document.getElementsByTagName('html')[0].classList.add('${process.platform}')`
    )
  })

  mainWindow.webContents.on('did-finish-load', () => {
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
      'document.getElementsByTagName("html")[0].classList.add("fullscreen")'
    )
  )
  mainWindow.on('leave-full-screen', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.remove("fullscreen")'
    )
  )
  mainWindow.on('blur', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.add("blur")'
    )
  )
  mainWindow.on('focus', () =>
    mainWindow.webContents.executeJavaScript(
      'document.getElementsByTagName("html")[0].classList.remove("blur")'
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
  if (process.platform !== 'linux') {
    const accentColor = getAccentColor()
    mainWindow.webContents.send('accent-color', accentColor)
  }
}

// Listen for accent color changes in System Preferences
// macOS
if (process.platform === 'darwin') {
  systemPreferences.subscribeNotification('AppleAquaColorVariantChanged', () =>
    switchAccentColor()
  )
}

// Windows
if (process.platform === 'windows') {
  systemPreferences.on('accent-color-changed', () => switchAccentColor())
}

//
// Appearance setting
// macOS
//
const switchTheme = () => {
  if (process.platform === 'darwin') {
    const isDarkMode = nativeTheme.shouldUseDarkColors

    isDarkMode
      ? mainWindow.webContents.executeJavaScript(
          'document.getElementsByTagName("html")[0].classList.add("dark")'
        )
      : mainWindow.webContents.executeJavaScript(
          'document.getElementsByTagName("html")[0].classList.remove("dark")'
        )
  }
}

// Listen for appearance changes in System Preferences
if (process.platform === 'darwin') {
  systemPreferences.subscribeNotification(
    'AppleInterfaceThemeChangedNotification',
    () => switchTheme()
  )
}
