import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchBar, Button } from 'react-touchbar-electron'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import { AppContext } from '../store/createContext'

const TouchbarItems = ({ prices, currency, toggleCurrencies, accentColor }) => (
  <>
    <Button
      label={formatCurrency(1, 'OCEAN', locale).replace(/OCEAN/, 'Ọ')}
      onClick={() => toggleCurrencies('ocean')}
      backgroundColor={currency === 'ocean' ? accentColor : '#141414'}
    />
    {Object.keys(prices).map(key => (
      <Button
        key={key}
        label={formatCurrency(prices[key], key.toUpperCase(), locale)
          .replace(/BTC/, 'Ƀ')
          .replace(/ETH/, 'Ξ')}
        onClick={() => toggleCurrencies(key)}
        backgroundColor={
          currency !== 'ocean' && currency === key ? accentColor : '#141414'
        }
      />
    ))}
  </>
)

TouchbarItems.propTypes = {
  prices: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  toggleCurrencies: PropTypes.func.isRequired,
  accentColor: PropTypes.string
}

export default class Touchbar extends PureComponent {
  render() {
    return (
      <TouchBar>
        <TouchbarItems
          prices={this.context.prices}
          currency={this.context.currency}
          toggleCurrencies={this.context.toggleCurrencies}
          accentColor={this.context.accentColor}
        />
      </TouchBar>
    )
  }
}

Touchbar.contextType = AppContext
