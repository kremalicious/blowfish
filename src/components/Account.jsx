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
      <a
        onClick={() =>
          openUrl(`https://etherscan.io/address/${address}#tokentxns`)
        }
        title="Click to view on Etherscan"
        className="number-unit"
      >
        <Balance balance={balance} />
        <span className="label">{address.substring(0, 12)}...</span>
      </a>
    )
  }
}
