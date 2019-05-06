import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../store/createContext'
import { numberFormatter, fiatFormatter } from '../util/moneyFormatter'
import symbols from 'crypto-symbols'

const Balance = ({ balance }) => (
  <h1 className="number">
    <Consumer>
      {({ currency }) => {
        const isFiat = currency === 'usd' || currency === 'eur'
        const symbol =
          currency === 'ocean' ? 'Ọ' : symbols[currency.toUpperCase()]

        return isFiat ? (
          fiatFormatter(currency.toUpperCase(), balance[currency])
        ) : (
          <>
            {symbol} {numberFormatter(balance[currency]) || 0}
          </>
        )
      }}
    </Consumer>
  </h1>
)

Balance.propTypes = {
  balance: PropTypes.object.isRequired
}

export default Balance
