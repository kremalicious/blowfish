import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
import { PriceContext } from './createContext'
import { fetchData } from '../../utils'
import { refreshInterval, conversions } from '../../config'

export default function PriceProvider({ children }) {
  // construct initial prices Map to get consistent
  // order for Ticker and Touchbar
  let pricesMap = new Map()
  pricesMap.set('ocean', 1)
  conversions.map(key => pricesMap.set(key, 0))

  const [prices, setPrices] = useState(pricesMap)
  const [priceChanges, setPriceChanges] = useState(
    Object.assign(
      ...conversions.map(key => ({
        [key]: 0
      }))
    )
  )

  async function fetchAndSetPrices() {
    const currencies = conversions.join(',')
    const json = await fetchData(
      `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}&include_24hr_change=true`
    )

    let newPrices = new Map(prices) // make a shallow copy of the Map
    conversions.map(key => newPrices.set(key, json['ocean-protocol'][key])) // modify the copy

    const newPriceChanges = await Object.assign(
      ...conversions.map(key => ({
        [key]: json['ocean-protocol'][key + '_24h_change']
      }))
    )

    return { newPrices, newPriceChanges }
  }

  useEffect(() => {
    async function init() {
      try {
        const { newPrices, newPriceChanges } = await fetchAndSetPrices()
        setPrices(newPrices)
        setPriceChanges(newPriceChanges)
        global.ipcRenderer.send('prices-updated', Array.from(newPrices)) // convert Map to array, ipc messages seem to kill it
      } catch (error) {
        console.error(error.message)
      }
    }

    init()
    setInterval(init, ms(refreshInterval))

    return () => {
      clearInterval(init)
    }
  }, [])

  return (
    <PriceContext.Provider value={{ prices, priceChanges }}>
      {children}
    </PriceContext.Provider>
  )
}

PriceProvider.propTypes = {
  children: PropTypes.any.isRequired
}
