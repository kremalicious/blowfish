import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { AppContext } from '../store/createContext'
import { cryptoFormatter } from '../../utils'
import styles from './Balance.module.scss'
import { fadeIn } from './Animations'

const Animation = posed.h1(fadeIn)

export default class Balance extends PureComponent {
  static contextType = AppContext

  static propTypes = {
    balance: PropTypes.object.isRequired
  }

  render() {
    const { currency } = this.context
    const { balance } = this.props

    return (
      <PoseGroup animateOnMount>
        <Animation key={currency} className={styles.number}>
          {cryptoFormatter(balance[currency], currency)}
        </Animation>
      </PoseGroup>
    )
  }
}