import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchBar, Button } from 'react-touchbar-electron'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import { AppContext } from '../store/createContext'

const TouchbarItems = ({ prices, currency, toggleCurrencies }) => (
  <>
    <Button
      label={formatCurrency(1, 'OCEAN', locale).replace(/OCEAN/, 'Ọ')}
      onClick={() => toggleCurrencies('ocean')}
      backgroundColor={currency === 'ocean' ? '#f6388a' : '#141414'}
    />
    {Object.keys(prices).map(key => (
      <Button
        key={key}
        label={formatCurrency(prices[key], key.toUpperCase(), locale)
          .replace(/BTC/, 'Ƀ')
          .replace(/ETH/, 'Ξ')}
        onClick={() => toggleCurrencies(key)}
        backgroundColor={
          currency !== 'ocean' && currency === key ? '#f6388a' : '#141414'
        }
      />
    ))}
  </>
)

TouchbarItems.propTypes = {
  prices: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  toggleCurrencies: PropTypes.func.isRequired
}

export default class Touchbar extends PureComponent {
  render() {
    return (
      <TouchBar>
        <TouchbarItems
          prices={this.context.prices}
          currency={this.context.currency}
          toggleCurrencies={this.context.toggleCurrencies}
        />
      </TouchBar>
    )
  }
}

Touchbar.contextType = AppContext
