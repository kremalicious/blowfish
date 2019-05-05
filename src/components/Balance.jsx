import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../store/createContext'
import { numberFormatter, fiatFormatter } from '../util/moneyFormatter'

const Balance = ({ balance }) => {
  const { ocean, eur, usd } = balance

  return (
    <Consumer>
      {({ currency }) =>
        currency === 'ocean' ? (
          <span className="balance" title={numberFormatter(ocean)}>
            Ọ {numberFormatter(ocean) || 0}
          </span>
        ) : currency === 'eur' ? (
          <span className="balance">{fiatFormatter('EUR', eur)}</span>
        ) : (
          <span className="balance">{fiatFormatter('USD', usd)}</span>
        )
      }
    </Consumer>
  )
}

Balance.propTypes = {
  balance: PropTypes.shape({
    ocean: PropTypes.number.isRequired,
    eur: PropTypes.number.isRequired,
    usd: PropTypes.number.isRequired
  })
}

export default Balance
