import React, { useContext } from 'react'
import { Link } from '@reach/router'
import classnames from 'classnames'
import { AppContext } from '../../store/createContext'
import Welcome from '../../components/Welcome'
import Spinner from '../../components/Spinner'
import Divider from '../../components/Divider'
import Total from './Total'
import Account from './Account'
import Ticker from './Ticker'
import IconCog from '../../images/cog.svg'
import styles from './index.module.css'

const Accounts = () => {
  const { accounts } = useContext(AppContext)

  return (
    <div className={styles.balanceWrapAccounts}>
      {accounts.map((account, i) => (
        <Account key={i} account={account} />
      ))}
    </div>
  )
}

const Home = () => {
  const { isLoading, needsConfig } = useContext(AppContext)

  return (
    <>
      <main className={classnames(styles.main, 'box')}>
        <Link className={styles.preferences} to="/preferences">
          <IconCog />
        </Link>

        {needsConfig ? (
          <Welcome />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <>
            <Total />
            <Divider />
            <Accounts />
          </>
        )}
      </main>

      <Ticker style={isLoading ? { opacity: 0 } : null} />
    </>
  )
}

export default Home
