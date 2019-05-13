import React, { PureComponent } from 'react'
import { TouchBar, Button } from 'react-touchbar-electron'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import { AppContext } from '../store/createContext'

export default class Touchbar extends PureComponent {
  items = (
    <>
      <Button
        label={formatCurrency(1, 'OCEAN', locale).replace(/OCEAN/, 'Ọ')}
        onClick={() => this.context.toggleCurrencies('ocean')}
      />
      {Object.keys(this.context.prices).map(key => (
        <Button
          key={key}
          label={formatCurrency(
            this.context.prices[key],
            key.toUpperCase(),
            locale
          )
            .replace(/BTC/, 'Ƀ')
            .replace(/ETH/, 'Ξ')}
          onClick={() => this.context.toggleCurrencies(key)}
        />
      ))}
    </>
  )

  render() {
    return <TouchBar>{this.items}</TouchBar>
  }
}

Touchbar.contextType = AppContext
