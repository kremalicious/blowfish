import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Balance from './Balance'

export default class Account extends PureComponent {
  static propTypes = {
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.shape({
        ocean: PropTypes.number.isRequired,
        eur: PropTypes.number.isRequired,
        usd: PropTypes.number.isRequired
      }).isRequired
    })
  }

  render() {
    const { account } = this.props
    const { balance, address } = account

    return (
      <div className="number-unit">
        <Balance balance={balance} />
        <span className="label" title={address}>
          {address.substring(0, 12)}...
        </span>
      </div>
    )
  }
}
