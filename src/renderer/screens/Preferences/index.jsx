import React from 'react'
import { Link } from '@reach/router'
import Accounts from './Accounts'
import styles from './index.module.css'

const Preferences = () => (
  <div className={styles.preferences}>
    <h1 className={styles.title}>Preferences</h1>{' '}
    <Link className={styles.close} title="Close Preferences" to="/">
      &times;
    </Link>
    <Accounts />
  </div>
)

export default Preferences
