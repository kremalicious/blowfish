import React, { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../store/createContext'
import Welcome from '../components/Home/Welcome'
import Spinner from '../components/Spinner'
import Divider from '../components/Divider'
import Total from '../components/Home/Total'
import Ticker from '../components/Home/Ticker'
import Accounts from '../components/Home/Accounts'
import IconCog from '../images/cog.svg'
import styles from './index.module.css'

export default function Home() {
  const { isLoading, needsConfig } = useContext(AppContext)

  return (
    <>
      <main className={styles.main}>
        <Link href="/preferences">
          <a className={styles.preferences}>
            <IconCog />
          </a>
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
