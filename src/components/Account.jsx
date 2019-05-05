import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { fiatFormatter, numberFormatter } from '../util/moneyFormatter'

class Account extends PureComponent {
  static propTypes = {
    isNativeShown: PropTypes.bool.isRequired,
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.shape({
        ocean: PropTypes.number.isRequired,
        eur: PropTypes.number.isRequired
      }).isRequired
    })
  }

  render() {
    const { balance, address } = this.props.account
    const { ocean, eur } = balance

    return (
      <div className="number-unit">
        <h1 className="number">
          {this.props.isNativeShown ? (
            <span className="balance-native">{fiatFormatter('EUR', eur)}</span>
          ) : (
            <span className="balance" title={numberFormatter(ocean)}>
              {numberFormatter(ocean) || 0} Ọ
            </span>
          )}
        </h1>
        <span className="label" title={address}>
          {address.substring(0, 12)}...
        </span>
      </div>
    )
  }
}

export default Account
