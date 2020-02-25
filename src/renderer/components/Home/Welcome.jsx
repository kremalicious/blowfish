import React, { useContext } from 'react'
import Link from 'next/link'
import { AppContext } from '../../store/createContext'
import IconRocket from '../../images/rocket.svg'
import styles from './Welcome.module.css'

const Welcome = () => {
  const { accentColor } = useContext(AppContext)

  return (
    <div className={styles.welcome}>
      <IconRocket />
      <Link href="/preferences">
        <a style={{ color: accentColor }}>
          Add your first address to get started.
        </a>
      </Link>
    </div>
  )
}

export default Welcome
