import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../store/createContext'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import SplitText from 'react-pose-text'
import './Balance.css'
import { characterAnimation } from './Animations'

export default class Balance extends PureComponent {
  static contextType = AppContext

  static propTypes = {
    balance: PropTypes.object.isRequired
  }

  render() {
    const { currency } = this.context
    const { balance } = this.props

    return (
      <h1 className="number">
        <SplitText
          initialPose="exit"
          pose="enter"
          charPoses={characterAnimation}
        >
          {formatCurrency(balance[currency], currency.toUpperCase(), locale)
            .replace(/BTC/, 'Ƀ')
            .replace(/ETH/, 'Ξ')
            .replace(/OCEAN/, 'Ọ')}
        </SplitText>
      </h1>
    )
  }
}
