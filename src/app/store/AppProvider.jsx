import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
import { ipcRenderer } from 'electron'
import Store from 'electron-store'
import { AppContext } from './createContext'
import fetchData from '../util/fetch'
import { refreshInterval, prices, oceanTokenContract } from '../config'

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
    toggleCurrencies: currency => this.setState({ currency }),
    setBalances: () => this.setBalances(),
    accentColor: ''
  }

  async componentDidMount() {
    ipcRenderer.on('accent-color', (event, accentColor) => {
      this.setState({ accentColor })
    })

    await this.fetchAndSetPrices()
    await this.setBalances()

    setInterval(this.fetchAndSetPrices, ms(refreshInterval))
    setInterval(this.setBalances, ms(refreshInterval))

    this.setState({ isLoading: false })
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
      this.setState({ needsConfig: true })
    }

    return accountsPref
  }

  async getBalance(account) {
    const json = await fetchData(
      `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${oceanTokenContract}&address=${account}&tag=latest`
    )

    const balance = (json.result /= 1000000000000000000) // Convert from vodka 10^18
    return balance
  }

  fetchAndSetPrices = async () => {
    const currencies = prices.join(',')
    const json = await fetchData(
      `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}`
    )

    const newPrizes = Object.assign(
      ...prices.map(key => ({
        ocean: 1,
        [key]: json['ocean-protocol'][key]
      }))
    )

    this.setState({ prices: newPrizes })
  }

  setBalances = async () => {
    const accountsPref = await this.getAccounts()

    let newAccounts = []

    for (const account of accountsPref) {
      const oceanBalance = await this.getBalance(account)

      const conversions = Object.assign(
        ...prices.map(key => ({
          [key]: oceanBalance * this.state.prices[key] || 0
        }))
      )

      const newAccount = {
        address: account,
        balance: {
          ocean: oceanBalance,
          ...conversions
        }
      }

      newAccounts.push(newAccount)
    }

    if (newAccounts !== this.state.accounts) {
      this.setState({ accounts: newAccounts })
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
