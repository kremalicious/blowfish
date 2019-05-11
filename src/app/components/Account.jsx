import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { openUrl } from '../util/openUrl'
import Balance from './Balance'

export default class Account extends PureComponent {
  static propTypes = {
    account: PropTypes.shape({
      address: PropTypes.string.isRequired,
      balance: PropTypes.object.isRequired
    })
  }

  render() {
    const { account } = this.props
    const { balance, address } = account

    return (
      <div className="number-unit">
        <Balance balance={balance} />
        <a
          className="label"
          onClick={() =>
            openUrl(`https://etherscan.io/address/${address}#tokentxns`)
          }
          title="Click to view on Etherscan"
        >
          {address.substring(0, 12)}&hellip;
        </a>
      </div>
    )
  }
}
