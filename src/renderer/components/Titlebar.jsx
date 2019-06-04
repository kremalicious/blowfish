import React from 'react'
import pkg from '../../../package.json'
import styles from './Titlebar.module.scss'

const Titlebar = () => (
  <header className={styles.titlebar}>
    <span className={styles.titlebarTitle}>{pkg.productName}</span>
  </header>
)

export default Titlebar
