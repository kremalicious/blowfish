import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../store/createContext'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'

const Balance = ({ balance }) => (
  <h1 className="number">
    <Consumer>
      {({ currency }) =>
        formatCurrency(balance[currency], currency.toUpperCase(), locale)
          .replace(/BTC/, 'Ƀ')
          .replace(/ETH/, 'Ξ')
          .replace(/OCEAN/, 'Ọ')
      }
    </Consumer>
  </h1>
)

Balance.propTypes = {
  balance: PropTypes.object.isRequired
}

export default Balance
