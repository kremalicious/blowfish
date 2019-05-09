import React, { PureComponent } from 'react'
import { AppContext } from '../store/createContext'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import './Ticker.css'

export default class Ticker extends PureComponent {
  static contextType = AppContext

  render() {
    const { toggleCurrencies, needsConfig, currency, prices } = this.context

    return (
      <footer className="number-unit-wrap ticker" {...this.props}>
        {Object.keys(prices).map((key, i) => (
          <div key={i} className="number-unit">
            <button
              className={`label label--price ${key === currency &&
                !needsConfig &&
                'active'}`}
              onClick={() => toggleCurrencies(key)}
              disabled={needsConfig}
            >
              {formatCurrency(prices[key], key.toUpperCase(), locale)
                .replace(/BTC/, 'Ƀ')
                .replace(/ETH/, 'Ξ')
                .replace(/OCEAN/, 'Ọ')}
            </button>
          </div>
        ))}
      </footer>
    )
  }
}
