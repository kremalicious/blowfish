import React, { PureComponent } from 'react'
import { AppContext } from '../store/createContext'
import Balance from './Balance'
import { prices } from '../config'

const calculateTotalBalance = (accounts, currency) => {
  const balanceTotalArray = []

  for (const account of accounts) {
    balanceTotalArray.push(account.balance[currency])
  }

  // Convert array to numbers and add numbers together
  const balanceTotal = balanceTotalArray.reduce(
    (a, b) => Number(a) + Number(b),
    0
  )

  return balanceTotal
}

export default class Total extends PureComponent {
  static contextType = AppContext

  render() {
    const conversions = Object.assign(
      ...prices.map(key => ({
        [key]: calculateTotalBalance(this.context.accounts, key)
      }))
    )

    const balanceNew = {
      ocean: calculateTotalBalance(this.context.accounts, 'ocean'),
      ...conversions
    }

    return (
      <div className="number-unit number-unit--main">
        <Balance balance={balanceNew} />
        <span className="label">Total Balance</span>
      </div>
    )
  }
}
