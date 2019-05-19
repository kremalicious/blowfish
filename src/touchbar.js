const { TouchBar } = require('electron')
const { formatCurrency } = require('@coingecko/cryptoformat')
const { prices } = require('./app/config')

const { TouchBarButton } = TouchBar

// const currency = ipc...
// const prices = ipc...

const createButton = (price, key, locale, mainWindow) => {
  const formattedPrice = formatCurrency(price, key.toUpperCase(), locale)
    .replace(/OCEAN/, 'Ọ')
    .replace(/BTC/, 'Ƀ')
    .replace(/ETH/, 'Ξ')

  return new TouchBarButton({
    label: formattedPrice,
    click: () => {
      console.log('ping')
      mainWindow.webContents.send('setCurrency', key)
    }
    // backgroundColor: currency === 'ocean' ? '#f6388a' : '#141414'
  })
}

const buildTouchbar = (mainWindow, locale) => {
  const touchBar = new TouchBar({
    items: [
      createButton(1, 'ocean', locale, mainWindow),
      ...prices.map(key => createButton(0, key, locale, mainWindow))
    ]
  })

  mainWindow.setTouchBar(touchBar)
}

module.exports = buildTouchbar
