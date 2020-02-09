import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ms from 'ms'
// import { ipcRenderer } from 'electron'
import Store from 'electron-store'
import { AppContext } from './createContext'
import { fetchData } from '../../utils'
import { refreshInterval, conversions, oceanTokenContract } from '../../config'

// construct initial prices Map to get consistent
// order for Ticker and Touchbar
let pricesMap = new Map()
pricesMap.set('ocean', 1)
conversions.map(key => pricesMap.set(key, 0))

export default class AppProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  store = process.env.NODE_ENV === 'test' ? new Store() : global.store

  state = {
    isLoading: true,
    accounts: [],
    currency: 'ocean',
    needsConfig: false,
    prices: pricesMap,
    priceChanges: Object.assign(
      ...conversions.map(key => ({
        [key]: 0
      }))
    ),
    toggleCurrencies: currency => this.toggleCurrencies(currency),
    setBalances: () => this.setBalances(),
    accentColor: '#f6388a'
  }

  async componentDidMount() {
    // listener for accent color
    global.ipcRenderer.on('accent-color', (evt, accentColor) => {
      this.setState({ accentColor })
    })

    // listener for touchbar
    global.ipcRenderer.on('setCurrency', (evt, currency) =>
      this.state.toggleCurrencies(currency)
    )

    const newPrizes = await this.fetchAndSetPrices()
    this.setState({ prices: newPrizes })

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

    const balance = json.result / 1e18 // Convert from vodka 10^18
    return balance
  }

  fetchAndSetPrices = async () => {
    const currencies = conversions.join(',')
    const json = await fetchData(
      `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}&include_24hr_change=true`
    )

    let newPrices = new Map(this.state.prices) // make a shallow copy of the Map
    conversions.map(key => newPrices.set(key, json['ocean-protocol'][key])) // modify the copy

    const newPriceChanges = await Object.assign(
      ...conversions.map(key => ({
        [key]: json['ocean-protocol'][key + '_24h_change']
      }))
    )

    global.ipcRenderer.send('prices-updated', Array.from(newPrices)) // convert Map to array, ipc messages seem to kill it
    this.setState({ prices: newPrices, priceChanges: newPriceChanges })
    return newPrices
  }

  setBalances = async () => {
    const accountsPref = await this.getAccounts()

    let newAccounts = []

    for (const account of accountsPref) {
      const oceanBalance = await this.getBalance(account)

      const conversionsBalance = Object.assign(
        ...conversions.map(key => ({
          [key]: oceanBalance * this.state.prices.get(key) || 0
        }))
      )

      const newAccount = {
        address: account,
        balance: {
          ocean: oceanBalance,
          ...conversionsBalance
        }
      }

      newAccounts.push(newAccount)
    }

    if (newAccounts !== this.state.accounts) {
      this.setState({ accounts: newAccounts })
    }
  }

  toggleCurrencies(currency) {
    const pricesNew = Array.from(this.state.prices)
    global.ipcRenderer.send('currency-updated', pricesNew, currency)
    this.setState({ currency })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
