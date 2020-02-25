import React from 'react'
import Link from 'next/link'
import AccountsList from '../components/Preferences/AccountsList'
import styles from './preferences.module.css'

export default function Preferences() {
  return (
    <div className={styles.preferences}>
      <h1 className={styles.title}>Preferences</h1>{' '}
      <Link href="/">
        <a className={styles.close} title="Close Preferences">
          &times;
        </a>
      </Link>
      <AccountsList />
    </div>
  )
}
