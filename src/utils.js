import { app, shell } from 'electron'
import { formatCurrency } from '@coingecko/cryptoformat'
import axios from 'axios'

const fetchData = async (url) => {
  try {
    const response = await axios(url)

    if (response.status !== 200) {
      return console.error('Non-200 response: ' + response.status)
    }

    return response.data
  } catch (error) {
    console.error('Error parsing json: ' + error.message)
  }
}

const isFiat = (currency) => currency === 'eur' || currency === 'usd'

const openUrl = (url) => {
  shell.openExternal(url)
}

const rgbaToHex = (color) => {
  const r = color.substr(0, 2)
  const g = color.substr(2, 2)
  const b = color.substr(4, 2)
  // const a = color.substr(6, 2)

  return '#' + r + g + b
}

const locale =
  typeof navigator !== 'undefined' ? navigator.language : () => app.getLocale()

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
const numberFormatter = (value) =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  }).format(value)

const formatOcean = (value) => {
  const numberformatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
    style: 'currency',
    currency: 'EUR' // fake currency symbol to replace later
  }).format(value)

  return numberformatted.replace(/EUR/, 'Ọ').replace(/€/, 'Ọ')
}

const formatFiat = (value, currency) => {
  const numberformatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(value)

  return numberformatted
}

const cryptoFormatter = (value, currency) => {
  if (currency === 'ocean') {
    return formatOcean(value)
  } else if (isFiat(currency)) {
    return formatFiat(value, currency)
  } else {
    return formatCurrency(value, currency.toUpperCase(), locale)
      .replace(/BTC/, 'Ƀ')
      .replace(/ETH/, 'Ξ')
  }
}

export {
  openUrl,
  rgbaToHex,
  locale,
  numberFormatter,
  cryptoFormatter,
  fetchData
}
