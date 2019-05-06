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
          ) : (
            <span className="balance">{fiatFormatter('USD', usd)}</span>
          )
        }
      </Consumer>
    </h1>
  )
}

Balance.propTypes = {
  balance: PropTypes.shape({
    ocean: PropTypes.number.isRequired,
    btc: PropTypes.number.isRequired,
    eth: PropTypes.number.isRequired,
    eur: PropTypes.number.isRequired,
    usd: PropTypes.number.isRequired
  })
}

export default Balance
