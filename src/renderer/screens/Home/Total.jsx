import React, { useContext } from 'react'
import { AppContext } from '../../store/createContext'
import Balance from '../../components/Balance'
import { conversions } from '../../../config'

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

const Total = () => {
  const { accounts } = useContext(AppContext)

  const conversionsBalance = Object.assign(
    ...conversions.map(key => ({
      [key]: calculateTotalBalance(accounts, key)
    }))
  )

  const balanceNew = {
    ocean: calculateTotalBalance(accounts, 'ocean'),
    ...conversionsBalance
  }

  return <Balance balance={balanceNew} label="Total Balance" large />
}

export default Total
