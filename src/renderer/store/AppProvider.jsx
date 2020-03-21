import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
// import { ipcRenderer } from 'electron'
import { AppContext, PriceContext } from './createContext'
import { refreshInterval, conversions } from '../../config'
import { getAccounts, getBalance } from './helpers'

export default function AppProvider({ children }) {
  const { prices } = useContext(PriceContext)
  const [isLoading, setIsLoading] = useState(true)
  const [accounts, setAccounts] = useState([])
  const [needsConfig, setNeedsConfig] = useState(false)
  const [currency, setCurrency] = useState('ocean')
  const [accentColor, setAccentColor] = useState('#f6388a')
  const [error, setError] = useState()

  useEffect(() => {
    // listener for accent color
    if (process.env.NODE_ENV !== 'test') {
      global.ipcRenderer.on('accent-color', (evt, accentColor) => {
        setAccentColor(accentColor)
      })
    }
  }, [])

  useEffect(() => {
    async function init() {
      try {
        await setBalances()
        setIsLoading(false)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      }

      // listener for touchbar
      global.ipcRenderer.on('setCurrency', (evt, currency) =>
        toggleCurrencies(currency)
      )
    }

    init()
    setInterval(init, ms(refreshInterval))

    return () => {
      clearInterval(init)
    }
  }, [prices])

  async function setBalances() {
    let newAccounts = []
    const { needsConfig, accountsPref } = await getAccounts()
    setNeedsConfig(needsConfig)

    for (const account of accountsPref) {
      const oceanBalance = await getBalance(account)

      const conversionsBalance = Object.assign(
        ...conversions.map((key) => ({
          [key]: oceanBalance * prices.get(key) || 0
        }))
      )

      const newAccount = {
        address: account,
        balance: {
          ocean: oceanBalance,
          ...conversionsBalance
        }
      }

      newAccounts.push(newAccount)
    }

    if (newAccounts !== accounts) {
      setAccounts(newAccounts)
    }
  }

  function toggleCurrencies(currency) {
    setCurrency(currency)
    const pricesNew = Array.from(prices)
    global.ipcRenderer.send('currency-updated', pricesNew, currency)
  }

  const context = {
    isLoading,
    accounts,
    currency,
    needsConfig,
    accentColor,
    error,
    toggleCurrencies,
    setBalances
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
}
