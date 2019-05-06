import React from 'react'
import { Consumer } from '../store/createContext'
import Balance from './Balance'
import { prices } from '../../config'

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

const Total = () => (
  <div className="number-unit number-unit--main">
    <Consumer>
      {({ accounts }) => {
        const conversions = Object.assign(
          ...prices.map(key => ({
            [key]: calculateTotalBalance(accounts, key)
          }))
        )

        const balanceNew = {
          ocean: calculateTotalBalance(accounts, 'ocean'),
          ...conversions
        }

        return <Balance balance={balanceNew} />
      }}
    </Consumer>
    <span className="label">Total balance</span>
  </div>
)

export default Total
