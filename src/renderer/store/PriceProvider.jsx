import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PriceContext } from './createContext'
import { refreshInterval, conversions } from '../../config'
import { fetchData } from '../../utils'
import { convertPrices } from './helpers'
import useSWR from 'swr'
import ms from 'ms'

export default function PriceProvider({ children }) {
  // construct initial prices Map to get consistent
  // order for Ticker and Touchbar
  let pricesMap = new Map()
  pricesMap.set('ocean', 1)
  conversions.map((key) => pricesMap.set(key, 0))

  const [prices, setPrices] = useState(pricesMap)
  const [priceChanges, setPriceChanges] = useState(
    Object.assign(
      ...conversions.map((key) => ({
        [key]: 0
      }))
    )
  )

  // Fetch new prices periodically with swr
  const currencies = conversions.join(',')
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}&include_24hr_change=true`

  const { data } = useSWR(url, fetchData, {
    refreshInterval: ms(refreshInterval),
    onSuccess
  })

  async function onSuccess() {
    if (!data) return

    console.log('Got new prices.')
    const { newPrices, newPriceChanges } = await convertPrices(data, prices)

    setPrices(newPrices)
    setPriceChanges(newPriceChanges)
    global.ipcRenderer.send('prices-updated', Array.from(newPrices)) // convert Map to array, ipc messages seem to kill it
  }

  useEffect(() => {
    async function init() {
      await onSuccess()
    }
    init()
  }, [data])

  return (
    <PriceContext.Provider value={{ prices, priceChanges }}>
      {children}
    </PriceContext.Provider>
  )
}

PriceProvider.propTypes = {
  children: PropTypes.any.isRequired
}
