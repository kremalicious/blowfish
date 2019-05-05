import React from 'react'
import { Consumer } from '../store/createContext'
import { numberFormatter } from '../util/moneyFormatter'

const calculateTotalBalance = accounts => {
  const balanceTotalArray = []

  for (const account of accounts) {
    balanceTotalArray.push(account.balance.ocean)
  }

  // Convert array to numbers and add numbers together
  const balanceTotal = balanceTotalArray.reduce(
    (a, b) => Number(a) + Number(b),
    0
  )

  return numberFormatter(balanceTotal)
}

const Total = () => (
  <div className="number-unit number-unit--main">
    <Consumer>
      {({ accounts }) => {
        const total = calculateTotalBalance(accounts)
        return <h1 className="number">{total || 0} Ọ</h1>
      }}
    </Consumer>
    <span className="label">Total balance</span>
  </div>
)

export default Total
