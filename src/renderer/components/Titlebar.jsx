import React from 'react'
import pkg from '../../../package.json'
import styles from './Titlebar.module.css'

const Titlebar = () => (
  <header className={styles.titlebar}>
    <span className={styles.titlebarTitle}>{pkg.productName}</span>
  </header>
)

export default Titlebar
