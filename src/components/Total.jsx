import React from 'react'
import { Consumer } from '../store/createContext'
import Balance from './Balance'

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
        const totalOcean = calculateTotalBalance(accounts, 'ocean')
        const totalEur = calculateTotalBalance(accounts, 'eur')
        const totalUsd = calculateTotalBalance(accounts, 'usd')

        const balance = {
          ocean: totalOcean,
          eur: totalEur,
          usd: totalUsd
        }

        return (
          <h1 className="number">
            <Balance balance={balance} />
          </h1>
        )
      }}
    </Consumer>
    <span className="label">Total balance</span>
  </div>
)

export default Total
