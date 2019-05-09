import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../store/createContext'
import { locale } from '../util/moneyFormatter'
import { formatCurrency } from '@coingecko/cryptoformat'
import './Balance.css'

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
        {formatCurrency(balance[currency], currency.toUpperCase(), locale)
          .replace(/BTC/, 'Ƀ')
          .replace(/ETH/, 'Ξ')
          .replace(/OCEAN/, 'Ọ')}
      </h1>
    )
  }
}
