const { TouchBar } = require('electron')
const { cryptoFormatter } = require('./utils')

const { TouchBarButton } = TouchBar

// const currency = ipc...
// const prices = ipc...

const createButton = (value, key, mainWindow, accentColor) => {
  return new TouchBarButton({
    label: cryptoFormatter(value, key.toUpperCase()),
    click: () => mainWindow.webContents.send('setCurrency', key),
    backgroundColor: key === 'ocean' ? accentColor : '#141414'
  })
}

const buildTouchbar = (prices, mainWindow, accentColor) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, accentColor),
      ...prices.map(key => createButton(0, key, mainWindow, accentColor))
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

const updateTouchbar = (prices, mainWindow, accentColor) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, accentColor),
      ...Object.entries(prices)
        .filter(([key]) => key !== 'ocean')
        .map(([key, value]) =>
          createButton(value, key, mainWindow, accentColor)
        )
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

module.exports = { buildTouchbar, updateTouchbar }
