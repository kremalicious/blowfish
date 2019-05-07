import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
import Store from 'electron-store'
import { Provider } from './createContext'
import { refreshInterval, prices, oceanTokenContract } from '../../config'

export default class AppProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  store = new Store()

  state = {
    isLoading: true,
    accounts: [],
    currency: 'ocean',
    needsConfig: false,
    prices: Object.assign(...prices.map(key => ({ [key]: 0 }))),
    toggleCurrencies: currency => this.setState({ currency })
  }

  async componentDidMount() {
    const { accountsPref } = await this.getAccounts()
    await this.fetchAndSetPrices()
    await this.setBalances(accountsPref)

    await setInterval(this.fetchAndSetPrices, ms(refreshInterval))
    await setInterval(this.setBalances, ms(refreshInterval))

    this.setState({ isLoading: false })

    // document.addEventListener('DOMContentLoaded', () => {
    //   this.store.onDidChange('accounts', async (newValue, oldValue) => {
    //     const { accounts } = await this.getAccounts()
    //     await this.setBalances(accounts)

    //     console.log('hello from setting window', newValue, oldValue)
    //   })
    // })
  }

  componentWillUnmount() {
    this.clearAccounts()
  }

  getAccounts() {
    let accountsPref

    if (this.store.has('accounts')) {
      accountsPref = this.store.get('accounts')

      !accountsPref.length
        ? this.setState({ needsConfig: true })
        : this.setState({ needsConfig: false })
    } else {
      accountsPref = []
    }

    return { accountsPref }
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

  async fetchBalance(account) {
    const json = await this.fetch(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${oceanTokenContract}&address=${account}&tag=latest`
    )

    const balance = (json.result /= 1000000000000000000) // Convert from wei 10^18
    return balance
  }

  async fetchAndSetPrices() {
    const currencies = prices.join(',')
    const json = await this.fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}`
    )

    await this.setState({
      prices: Object.assign(
        ...prices.map(key => ({
          ocean: 1,
          [key]: json['ocean-protocol'][key]
        }))
      )
    })
  }

  setBalances(accounts) {
    // TODO: make this less lazy and update numbers in place
    // when they are changed instead of resetting all to 0 here
    this.clearAccounts()

    const accountsArray = accounts ? accounts : this.state.accounts

    accountsArray.map(async account => {
      const oceanBalance = await this.fetchBalance(account)

      const conversions = Object.assign(
        ...prices.map(key => ({
          [key]: oceanBalance * this.state.prices[key] || 0
        }))
      )

      const newAccount = {
        address: account,
        balance: {
          ocean: oceanBalance || 0,
          ...conversions
        }
      }

      await this.setState(prevState => ({
        accounts: [...prevState.accounts, newAccount]
      }))
    })
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}
