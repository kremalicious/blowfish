import React, { PureComponent } from 'react'
import { Consumer } from '../store/createContext'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import './Ticker.css'

export default class Ticker extends PureComponent {
  render() {
    return (
      <footer className="number-unit-wrap ticker" {...this.props}>
        <Consumer>
          {({ toggleCurrencies, currency, prices }) => (
            <>
              {Object.keys(prices).map((key, i) => (
                <div key={i} className="number-unit">
                  <button
                    className={`label label--price ${key === currency &&
                      'active'}`}
                    onClick={() => toggleCurrencies(key)}
                  >
                    {formatCurrency(prices[key], key.toUpperCase(), locale)
                      .replace(/BTC/, 'Ƀ')
                      .replace(/ETH/, 'Ξ')
                      .replace(/OCEAN/, 'Ọ')}
                  </button>
                </div>
              ))}
            </>
          )}
        </Consumer>
      </footer>
    )
  }
}
