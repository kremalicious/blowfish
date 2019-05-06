import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../store/createContext'
import { numberFormatter, fiatFormatter } from '../util/moneyFormatter'

const Balance = ({ balance }) => {
  const { ocean, btc, eth, eur, usd } = balance

  return (
    <h1 className="number">
      <Consumer>
        {({ currency }) =>
          currency === 'ocean' ? (
            <span className="balance">Ọ {numberFormatter(ocean) || 0}</span>
          ) : currency === 'btc' ? (
            <span className="balance">₿ {numberFormatter(btc) || 0}</span>
          ) : currency === 'eth' ? (
            <span className="balance">Ξ {numberFormatter(eth) || 0}</span>
          ) : currency === 'eur' ? (
            <span className="balance">{fiatFormatter('EUR', eur)}</span>
          ) : currency === 'usd' ? (
            <span className="balance">{fiatFormatter('USD', usd)}</span>
          ) : (
            <span className="balance">{numberFormatter(currency)}</span>
          )
        }
      </Consumer>
    </h1>
  )
}

Balance.propTypes = {
  balance: PropTypes.object.isRequired
}

export default Balance
