import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
import { Provider } from './createContext'
import { accounts, refreshInterval, oceanTokenContract } from '../../config'

export default class AppProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  state = {
    accounts: [],
    currency: 'ocean',
    toggleCurrencies: currency => this.setState({ currency })
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

  async fetch(url) {
    try {
      const response = await fetch(url)

      if (response.status !== 200) {
        return console.log('Non-200 response: ' + response.status) // eslint-disable-line
      }

      const json = await response.json()
      if (!json) return

      return json
    } catch (error) {
      console.log('Error parsing json:' + error) // eslint-disable-line
    }
  }

  fetchBalance = async account => {
    const json = await this.fetch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${oceanTokenContract}&address=${account}&tag=latest`
    )

    const balance = (json.result /= 1000000000000000000) // Convert from wei 10^18
    return balance
  }

  fetchPrice = async () => {
    const json = await this.fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=usd,eur'
    )

    const { usd, eur } = json['ocean-protocol']
    return { usd, eur }
  }

  setBalances = async () => {
    // TODO: make this less lazy and update numbers in place
    // when they are changed instead of resetting all to 0 here
    this.clearAccounts()

    const { usd, eur } = await this.fetchPrice()

    accounts.map(async account => {
      const oceanBalance = await this.fetchBalance(account)

      const newAccount = {
        address: account,
        balance: {
          ocean: oceanBalance || 0,
          eur: oceanBalance / eur || 0,
          usd: oceanBalance / usd || 0
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
