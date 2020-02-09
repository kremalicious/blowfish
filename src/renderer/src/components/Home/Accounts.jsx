import React, { useContext } from 'react'
import { openUrl } from '../../../../utils'
import Balance from '../Balance'
import { AppContext } from '../../store/createContext'
import styles from './Accounts.module.css'

const Accounts = () => {
  const { accounts } = useContext(AppContext)

  return (
    <div className={styles.accounts}>
      {accounts.map((account, i) => (
        <Balance
          key={i}
          balance={account.balance}
          label={`${account.address.substring(0, 12)}...`}
          labelOnClick={() =>
            openUrl(`https://etherscan.io/address/${account.address}#tokentxns`)
          }
        />
      ))}
    </div>
  )
}

export default Accounts
