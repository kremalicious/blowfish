import React from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../store/createContext'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'

const Balance = ({ balance }) => (
  <h1 className="number">
    <AppContext.Consumer>
      {({ currency }) =>
        formatCurrency(balance[currency], currency.toUpperCase(), locale)
          .replace(/BTC/, 'Ƀ')
          .replace(/ETH/, 'Ξ')
          .replace(/OCEAN/, 'Ọ')
      }
    </AppContext.Consumer>
  </h1>
)

Balance.propTypes = {
  balance: PropTypes.object.isRequired
}

export default Balance
