import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { AppContext } from '../store/createContext'
import { cryptoFormatter } from '../../utils'
import { fadeIn } from './Animations'
import Label from './Label'
import styles from './Balance.module.css'

const Animation = posed.h1(fadeIn)

const Balance = ({ balance, label, labelOnClick, large }) => {
  const { currency } = useContext(AppContext)

  return (
    <div className={styles.balance}>
      <PoseGroup animateOnMount>
        <Animation
          key={currency}
          className={large ? styles.numberLarge : styles.number}
        >
          {cryptoFormatter(balance[currency], currency)}
        </Animation>
      </PoseGroup>
      {label && <Label labelOnClick={labelOnClick}>{label}</Label>}
    </div>
  )
}

Balance.propTypes = {
  balance: PropTypes.object.isRequired,
  label: PropTypes.string,
  labelOnClick: PropTypes.func,
  large: PropTypes.bool
}

export default Balance
