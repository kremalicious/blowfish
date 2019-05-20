const { TouchBar } = require('electron')
const { cryptoFormatter } = require('./utils')

const { TouchBarButton } = TouchBar

// const currency = ipc...
// const prices = ipc...

const createButton = (value, key, mainWindow, systemAccentColor) =>
  new TouchBarButton({
    label: cryptoFormatter(value, key.toUpperCase()),
    click: () => mainWindow.webContents.send('setCurrency', key),
    backgroundColor: key === 'ocean' ? systemAccentColor : '#141414'
  })

const buildTouchbar = (prices, mainWindow, systemAccentColor) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, systemAccentColor),
      ...prices.map(key => createButton(0, key, mainWindow, systemAccentColor))
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

const updateTouchbar = (prices, mainWindow, systemAccentColor) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, systemAccentColor),
      ...Object.entries(prices)
        .filter(([key]) => key !== 'ocean')
        .map(([key, value]) =>
          createButton(value, key, mainWindow, systemAccentColor)
        )
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

module.exports = { buildTouchbar, updateTouchbar }
