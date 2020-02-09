import React from 'react'
import Link from 'next/link'
import Accounts from '../components/Preferences/Accounts'
import styles from './preferences.module.css'

const Preferences = () => (
  <div className={styles.preferences}>
    <h1 className={styles.title}>Preferences</h1>{' '}
    <Link href="/">
      <a className={styles.close} title="Close Preferences">
        &times;
      </a>
    </Link>
    <Accounts />
  </div>
)

export default Preferences
