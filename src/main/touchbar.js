const { TouchBar } = require('electron')
const { cryptoFormatter } = require('../utils')
const { conversions } = require('../config')

const { TouchBarButton } = TouchBar

const createButton = (
  value,
  key,
  mainWindow,
  accentColor = '#f6388a',
  currentCurrency = 'ocean'
) =>
  new TouchBarButton({
    label: cryptoFormatter(value, key),
    click: () => mainWindow.webContents.send('setCurrency', key),
    backgroundColor: key === currentCurrency ? accentColor : '#141414'
  })

const buildTouchbar = (mainWindow, accentColor) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', mainWindow, accentColor),
      ...conversions.map((key) => createButton(0, key, mainWindow, accentColor))
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

const updateTouchbar = (
  pricesNew,
  mainWindow,
  accentColor,
  currentCurrency = 'ocean'
) => {
  const items = pricesNew.map((item) => {
    return createButton(
      item[1],
      item[0],
      mainWindow,
      accentColor,
      currentCurrency
    )
  })

  const touchBar = new TouchBar({
    items: [...items]
  })

  mainWindow.setTouchBar(touchBar)
}

module.exports = { buildTouchbar, updateTouchbar }
