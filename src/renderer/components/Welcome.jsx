import React, { useContext } from 'react'
import { Link } from '@reach/router'
import { AppContext } from '../store/createContext'
import IconRocket from '../images/rocket.svg'
import styles from './Welcome.module.css'

const Welcome = () => {
  const { accentColor } = useContext(AppContext)

  return (
    <div className={styles.welcome}>
      <IconRocket />
      <Link style={{ color: accentColor }} to="preferences">
        Add your first address to get started.
      </Link>
    </div>
  )
}

export default Welcome
