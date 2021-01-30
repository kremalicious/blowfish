import serve from 'electron-serve'
import { app, systemPreferences, nativeTheme, ipcMain } from 'electron'
import { productName } from '../../package.json'
import {
  createWindow,
  createWindowEvents,
  buildMenu,
  buildTouchbar,
  updateTouchbar
} from './helpers'
import { rgbaToHex } from '../utils'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

let mainWindow

const width = 640
const height = 450

;(async () => {
  await app.whenReady()

  const isDarkMode = nativeTheme.shouldUseDarkColors

  mainWindow = createWindow('main', {
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
    title: productName,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      scrollBounce: true,
      enableBlinkFeatures: 'OverlayScrollbars',
      enableRemoteModule: true
    }
  })

  if (isProd) {
    await mainWindow.loadURL('app://index.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)
    // mainWindow.webContents.openDevTools()
  }

  createWindowEvents(mainWindow)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
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

  switchAccentColor()
  switchTheme()

  // add platform as class
  mainWindow.webContents.executeJavaScript(
    `document.getElementsByTagName('html')[0].classList.add('${process.platform}')`
  )
})()

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

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
//
const switchTheme = () => {
  const isDarkMode = nativeTheme.shouldUseDarkColors

  isDarkMode
    ? mainWindow.webContents.executeJavaScript(
        'document.getElementsByTagName("html")[0].classList.add("dark")'
      )
    : mainWindow.webContents.executeJavaScript(
        'document.getElementsByTagName("html")[0].classList.remove("dark")'
      )
}

// Listen for appearance changes in System Preferences
if (process.platform === 'darwin') {
  systemPreferences.subscribeNotification(
    'AppleInterfaceThemeChangedNotification',
    () => switchTheme()
  )
}
