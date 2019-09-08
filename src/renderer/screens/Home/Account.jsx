import React from 'react'
import PropTypes from 'prop-types'
import { openUrl } from '../../../utils'
import Balance from '../../components/Balance'

const Account = ({ account }) => {
  const { balance, address } = account

  return (
    <Balance
      balance={balance}
      label={`${address.substring(0, 12)}...`}
      labelOnClick={() =>
        openUrl(`https://etherscan.io/address/${address}#tokentxns`)
      }
    />
  )
}

Account.propTypes = {
  account: PropTypes.shape({
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired
  })
}

export default Account
