import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
import { Provider } from './createContext'
import { accounts, refreshInterval, oceanTokenContract } from '../../constants'

export default class AppProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  state = {
    accounts: []
  }

  componentDidMount() {
    this.setBalances()
    setInterval(this.setBalances, ms(refreshInterval))
  }

  componentWillUnmount() {
    this.clearAccounts()
  }

  clearAccounts() {
    this.setState({ accounts: [] })
  }

  fetchBalance = async account => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${oceanTokenContract}&address=${account}`
      )

      if (response.status !== 200) {
        return console.log('Non-200 response: ' + response.status) // eslint-disable-line
      }

      const json = await response.json()
      if (!json) return

      const balance = (json.result /= 1000000000000000000) // Convert from wei 10^18
      return balance
    } catch (error) {
      console.log('Error parsing etherscan.io json:' + error) // eslint-disable-line
    }
  }

  setBalances = () => {
    this.clearAccounts()

    accounts.map(async account => {
      const oceanBalance = await this.fetchBalance(account)

      const newAccount = {
        address: account,
        balance: {
          ocean: oceanBalance || 0,
          eur: 0
        }
      }

      this.setState(prevState => ({
        accounts: [...prevState.accounts, newAccount]
      }))
    })
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
