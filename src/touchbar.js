const { TouchBar } = require('electron')
const { cryptoFormatter } = require('./utils')

const { TouchBarButton } = TouchBar

const createButton = (
  value,
  key,
  mainWindow,
  accentColor,
  currentCurrency = 'ocean'
) =>
  new TouchBarButton({
    label: cryptoFormatter(value, key),
    click: () => mainWindow.webContents.send('setCurrency', key),
    backgroundColor: key === currentCurrency ? accentColor : '#141414'
  })

const buildTouchbar = (prices, mainWindow, accentColor) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, accentColor),
      ...prices.map(key => createButton(0, key, mainWindow, accentColor))
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

const updateTouchbar = (
  prices,
  mainWindow,
  accentColor,
  currentCurrency = 'ocean'
) => {
  const items = Object.keys(prices)
    .filter(key => key !== 'ocean')
    .map(key =>
      createButton(prices[key], key, mainWindow, accentColor, currentCurrency)
    )

  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, accentColor, currentCurrency),
      ...items
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

module.exports = { buildTouchbar, updateTouchbar }
