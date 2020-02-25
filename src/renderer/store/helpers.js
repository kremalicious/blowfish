import Store from 'electron-store'
import unit from 'ethjs-unit'
import { fetchData } from '../../utils'
import { oceanTokenContract, conversions } from '../../config'

export async function fetchAndSetPrices(prices) {
  const currencies = conversions.join(',')
  const json = await fetchData(
    `https://api.coingecko.com/api/v3/simple/price?ids=ocean-protocol&vs_currencies=${currencies}&include_24hr_change=true`
  )

  let newPrices = new Map(prices) // make a shallow copy of the Map
  conversions.map(key => newPrices.set(key, json['ocean-protocol'][key])) // modify the copy

  const newPriceChanges = await Object.assign(
    ...conversions.map(key => ({
      [key]: json['ocean-protocol'][key + '_24h_change']
    }))
  )

  return { newPrices, newPriceChanges }
}

export async function getBalance(account) {
  const json = await fetchData(
    `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${oceanTokenContract}&address=${account}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`
  )

  const balance = unit.fromWei(`${json.result}`, 'ether')
  return balance
}

export async function getAccounts() {
  let needsConfig
  let accountsPref
  const store = process.env.NODE_ENV === 'test' ? new Store() : global.store

  if (store.has('accounts')) {
    accountsPref = store.get('accounts')
    needsConfig = !accountsPref.length
  } else {
    accountsPref = []
    needsConfig = true
  }

  return { needsConfig, accountsPref }
}
