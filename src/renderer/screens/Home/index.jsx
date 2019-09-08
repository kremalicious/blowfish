import React, { useContext } from 'react'
import { Link } from '@reach/router'
import { AppContext } from '../../store/createContext'
import Welcome from '../../components/Welcome'
import Spinner from '../../components/Spinner'
import Divider from '../../components/Divider'
import Total from './Total'
import Ticker from './Ticker'
import Accounts from './Accounts'
import IconCog from '../../images/cog.svg'
import styles from './index.module.css'

const Home = () => {
  const { isLoading, needsConfig } = useContext(AppContext)

  return (
    <>
      <main className={styles.main}>
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
